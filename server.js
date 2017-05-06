var express = require ('express');
var methodOverride = require ('method-override');
var bodyParser = require ('body-parser');

var PORT = 8080;

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

ioProm.then(function(io) {
    // io is the io object connected to the server.
    
    io.on('connection', function(socket) {
        console.log('Connected!');
        socket.on('incoming', function(data) {
            // Do stuff with data
 
            // Send data back to different listener
            socket.emit('outgoing', data);
        });
    });
});




require("./controllers/users_controller.js")(app);
//require("./controllers/passport_controller.js")(app);
require("./controllers/html-routes")(app);
require("./controllers/session_controller.js")(app);


db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});