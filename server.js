var express = require ('express');
var methodOverride = require ('method-override');
var bodyParser = require ('body-parser');
var passport = require('passport');
var session = require('express-session');
var path = require('path');


var PORT = process.env.PORT || 5000;

var app = express();


var db = require("./models");

app.use(express.static(process.cwd()+"/public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({secret: "classpoints"}));
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride("_method"));

var exphbs = require("express-handlebars");

app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");


var ioProm  = require('express-socket.io');
var server  = ioProm.init(app);

server.listen(PORT, function() {
    console.log('Server listening on port: ', PORT);
});

require("./controllers/socket_controller.js")(ioProm);
require("./controllers/users_controller.js")(app);
require("./controllers/leaderboard_controller.js")(app);
require("./controllers/class_controller.js")(app);
require("./controllers/classmates_controller.js")(app);
require("./controllers/html-routes")(app);
require("./controllers/session_controller.js")(app);
require("./controllers/api-controller.js")(app);
require("./controllers/passport_controller")(app);

db.sequelize.sync({}).then(function() {
  console.log("DB connected");
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});