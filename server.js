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


// STILL NEED
// 1. account for reconnects
// 2. findorcreate to add user to session or get their current points and add to session
// 3. write addPoint promise to handle adding a point to a user
// 4. on disconnect, update the sessiontable with the users current points (from sesObj)
// 5. move session.html JS and server.js socket logic to their own respective files

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Create an initial session object that will populate as users join sessions
var sesObj = {};

// Out IO Promise, all socket functions will happen inside here
ioProm.then(function(io) {
  io.on('connection', function(socket) {

    // A connection was made and an initialconnect message should be incoming (unless this is a reconnect which we need to account for)
    console.log("Socket connection - incoming initialConnect message");

    // This handles initial connect messages
    socket.on("initialConnect", function(data){

      // Log that we recieved an initial connect message
      console.log("initialConnect message recieved");

      /////////////////////////////////////
      // in here we need to find or create the user/class on the session table (permanently add to the session)
      // db.session.findOrCreate({
      //   where: {}
      // })
      ////////////////////////////////////

      // assign attributes to this particular socket for use later
      socket.userId = data.userId;
      socket.classId = data.classId;
      socket.points = 0;

      // query the database to find more information abuot the connected user
      db.User.findAll({
        where: {
          id: data.userId
        }
      }).then(function(data){

        // Add the user to the socket room (class) for emitting messages to specific classes
        socket.join(socket.classId);

        // if the class is not already an object in our session object
        if (typeof sesObj[socket.classId] === "undefined"){

          // then create it
          sesObj[socket.classId] = [];

          // or else
        } else {

          // emit all user to only the sender (for them to buil all cards for everyone currently in their joined class)
          socket.emit("allUsers", sesObj[socket.classId]);
        };

        // Create a new user object with data from the query (to be used for building cards on the client)
        var newUser = {
          userId: socket.userId,
          classId: socket.classId,
          fName: data[0].fName,
          lName: data[0].lName,
          email: data[0].email,
          picture: data[0].picture,
          gitLink: data[0].gitLink,
          points: 0
        };

        // add our user to their class in our session object
        sesObj[socket.classId].push(newUser);

        // emit to everyone in the class that a new user has joined (along with their data to build the card)
        io.to(socket.classId).emit("userAdd", newUser);
      });
    });

    // this handles disconnect messages
    socket.on('disconnect', function() {

      // Log to the console which user has disconnected
      console.log("User " + socket.userId + " disconnected");

      // Loop through the class object of the user that disconnected
      for (i=0; i<sesObj[socket.classId].length; i++){

        // if we find them
        if (sesObj[socket.classId][i].userId === socket.userId){

          // delete them from our class object (this keeps our class object clean with only connected users)
          sesObj[socket.classId].splice(i, 1);
          break;
        }
      };

      // if there are no longer any users in our class object
      if (!sesObj[socket.classId].length){

        // delete the class from our session object
        delete sesObj[socket.classId];

        // or else
      } else {

        // emit to everyone in the class the user id that has left (to be handled on the client side)
        io.to(socket.classId).emit("userRemove", socket.userId);
      };
    });
  });
});

// http://docs.sequelizejs.com/en/latest/docs/models-usage/
// http://stackoverflow.com/questions/24100218/socket-io-send-packet-to-sender-only
// https://github.com/socketio/socket.io/blob/318d62/examples/chat/index.js#L36
// http://stackoverflow.com/questions/19150220/creating-rooms-in-socket-io

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

require("./controllers/users_controller.js")(app);
require("./controllers/class_controller.js")(app);
require("./controllers/classmates_controller.js")(app);
require("./controllers/html-routes")(app);
require("./controllers/session_controller.js")(app);
require("./controllers/api-controller.js")(app);

db.sequelize.sync({}).then(function() {
  console.log("DB connected");
});