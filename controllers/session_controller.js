// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // class route renders class page
  app.get("/classes/:id", function(req, res) {
  	if(req.user){
  		console.log(req.user);
  		res.sendFile(path.join(__dirname,"../public/session.html"))
  	} else {
  		res.redirect("/");
  	}
    
  });

};