var express = require ('express');
var methodOverride = require ('method-override');
var bodyParser = require ('body-parser');
var passport = require('passport')
var session  = require("express-session");
var cookieParser = require("cookie-parser");

var PORT = 8080;

var app = express();

var db = require("./models");

app.use(express.static(process.cwd()+"/public"));
app.use(bodyParser.urlencoded({extended:false}));

app.use(methodOverride("_method"));

var exphbs = require("express-handlebars");

app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");

//PASSPORT REQUIREMENTS
 // app.use(express.static('public'));
  app.use(cookieParser());
  //app.use(express.bodyParser());
  app.use(session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  //app.use(app.router);



require("./controllers/users_controller.js")(app);
<<<<<<< HEAD
require("./controllers/passport_controller.js")(app);
=======
require("./controllers/class_controller.js")(app);
>>>>>>> 52cc3705d1ab47724db60c24f49ef8b97a5efd40
require("./controllers/html-routes")(app);


db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});