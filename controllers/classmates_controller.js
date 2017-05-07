// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // class route renders class page
  app.get("/classmates", function(req, res) {
    db.User.findAll({}).then(function(data) {

      var hbsObject = {
        classmate: data
      };
      res.render("classmates", hbsObject);
    })
  });

};