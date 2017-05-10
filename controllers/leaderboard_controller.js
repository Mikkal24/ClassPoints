// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // class route renders class page
  app.get("/leaderboard", function(req, res) {
    db.Users.findAll({}).then(function(data) {
      console.log("test");
      var hbsObject = {
        leaders: data
      };
      res.render("leaders", hbsObject);
    })
  });

};