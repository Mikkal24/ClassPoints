// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // class route renders class page
  app.get("/classes", function(req, res) {
    db.Class.findAll({}).then(function(data) {
      var hbsObject = {
        classes: data
      };
      res.render("classes", hbsObject);
    })
  });
};