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



require("./controllers/users_controller.js")(app);
require("./controllers/class_controller.js")(app);
require("./controllers/html-routes")(app);


db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});