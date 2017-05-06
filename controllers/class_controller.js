// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
var moment = require("moment");

// Routes
// =============================================================
module.exports = function(app) {

  // class route renders class page
  app.get("/classes", function(req, res) {
    db.Class.findAll({}).then(function(data) {

      // edit ISO date format to desired format
      for(var i=0; i<data.length; i++) {
        data[i].cleandate = moment(data[i].date).format("MMM DD, YYYY");
      }

      var hbsObject = {
        classes: data
      };
      res.render("classes", hbsObject);
    })
  });

};