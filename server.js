var express = require ('express');
var methodOverride = require ('method-override');
var bodyParser = require ('body-parser');


var PORT = 8000;

var app = express();


var db = require("./models");

app.use(express.static(process.cwd()+"/public"));
app.use(bodyParser.urlencoded({extended:false}));

app.use(methodOverride("_method"));

var exphbs = require("express-handlebars");

app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");


var ioProm  = require('express-socket.io');
var server  = ioProm.init(app);

server.listen(PORT, function() {
    console.log('Server listening on port: ', PORT);
});

// create a blank session array to add to as people connect
var sessionTable = [];

// function to determine if a connection made to socket is new or a reconnect
var determineConnect = function(userid){

  // loop through sessionTable
  for(i=0;i<sessionTable.length;i++){

    // if the incoming userId matches and entry already on the table
    if(userid == sessionTable[i].id){

      // return false because the user is already on the table
      return false
    };
  };
  
  // return true because the user doesn't exist in out table
  return true
};

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

var sesObj = {};

// Handels initialconnection emits userAdd
// Handels disconnect emits userRemove
ioProm.then(function(io) {
  io.on('connection', function(socket) {

    Console.log("Socket connection - incoming initialConnect message");

    socket.on("initialConnect", function(data){
      Console.log("initialConnect message recieved");
      socket.userId = data.userId;
      socket.classId = data.classId;
      socket.join(socket.classId);
      if (typeof sesObj[socket.classId] === "undefined"){
        sesObj[socket.classId] = [];
      };
      sesObj[socket.classId].push(socket.userId);
      io.to(socket.classId).emit(userAdd, sesObj[socket.classId]);
    });

    socket.on('disconnect', function() {
      console.log("User " + socket.userId + " disconnected");
      sesObj[socket.classId].splice(sesObj[socket.classId].indexOf(socket.userId), 1);
      if (!sesObj[socket.classId].length){
        delete sesObj[socket.classId];
      } else {
        io.to(socket.classId).emit(userRemove, socket.userId);
      };
    });

  });
});

// http://docs.sequelizejs.com/en/latest/docs/models-usage/
// http://stackoverflow.com/questions/24100218/socket-io-send-packet-to-sender-only
// https://github.com/socketio/socket.io/blob/318d62/examples/chat/index.js#L36
// http://stackoverflow.com/questions/19150220/creating-rooms-in-socket-io

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// This is our socket promise that will launch whenever we have an incoming event
ioProm.then(function(io) {
  // io is the io object connected to the server.
    
  // When we get an incoming event we preload all our custom events
  io.on('connection', function(socket) {
    console.log('Connected!');

    // Here is where we write all our custom events

    // A test event I used for testing (to be deleted)
    socket.on("test", function(data){
      console.log(data);
    });

    // An initial connection event that launches when someoneone connects
    // if they are a new connection we query our DB for their info and add it to the session table array and send it to everyone
    // If they are an existing connection we just send out the session table array to everyone
    socket.on("initialConnect", function(data){
      console.log(data);
      if(determineConnect(data.userId)){
        db.User.findAll({
          where: {
            id: data.userId
          }
        }).then(function(data){
          sessionTable.push(data[0]);
          socket.emit('userConnect', sessionTable);
          console.log("New user connect");
        });
      } else {
        socket.emit('userConnect', sessionTable);
        console.log("User Reconnect");
      };
    });


    socket.on('disconnect', function() {
      console.log('Got disconnect!');
    });
    });
});




require("./controllers/users_controller.js")(app);
require("./controllers/class_controller.js")(app);
require("./controllers/classmates_controller.js")(app);
require("./controllers/html-routes")(app);
require("./controllers/session_controller.js")(app);
require("./controllers/api-controller.js")(app);

db.sequelize.sync({}).then(function() {
  // app.listen(PORT, function() {
  //   console.log("App listening on PORT " + PORT);
  // });
  console.log("DB connected");
});