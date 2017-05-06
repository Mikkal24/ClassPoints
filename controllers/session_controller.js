// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // class route renders class page
  app.get("/session", function(req, res) {
    res.sendFile(path.join(__dirname,"../views/session.html"))
  });

};