// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // class route renders class page
  app.get("/class", function(req, res) {
    db.Classes.findAll({}).then(function(dbClasses) {
      res.json(dbClasses);
    })
    // res.render("index",hbsObject)
  });

};