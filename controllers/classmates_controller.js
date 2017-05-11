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

      // sort userArr in desc point order
      var compare = function(a, b) {
        if (a.fName < b.fName) {
          return -1;
        }
        if (a.fName > b.fName) {
          return 1;
        }
        return 0;
      }
      data.sort(compare);

      var hbsObject = {
        classmate: data
      };
      res.render("classmates", hbsObject);
    })
  });

};