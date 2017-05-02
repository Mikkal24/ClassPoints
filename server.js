var express = require ('express');
var methodOverride = require ('method-override');
var bodyParser = require ('body-parser');

var port = 8080;

var app = express();

app.use(express.static(process.cwd()+"/public"));
app.use(bodyParser.urlencoded({extended:false}));

app.use(methodOverride("_method"));

var exphbs = require("express-handlebars");

app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");

//UPDATE this field with the required controller
var routes = require(/*"./controllers/someController.js"*/);

app.use("/", routes);

app.listen(port);