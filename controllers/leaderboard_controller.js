// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
var Handlebars = require('handlebars');

// Routes
// =============================================================
module.exports = function(app) {

  // class route renders class page
  app.get("/leaderboard", function(req, res) {
    db.Session.findAll({
      include: [
        {model: db.User, as: 'User'}
      ]
    }).then(function(data) {
      
      var userArr = [];
      var uid = 1;
      var userPoints = 0;
      // logic to sum points by userid then display only top 10
      // find highest userid
      var highuid = 0;
      for (var i=0; i<data.length; i++) {
        if (data[i].UserId > highuid) {
          highuid = data[i].UserId
        }
      }
      // sum points by userid
      for (var j=1; j<highuid+1; j++) {
        // add all points for a given user
        for (var i=0; i<data.length; i++) {
          if (data[i].UserId == j) {
            userPoints += data[i].points;
          }
        }
        userArr.push({UserId: j-1, fName: data[j-1].User.fName, lName: data[j-1].User.lName, Points: userPoints});
        userPoints = 0;
      }

      // sort userArr in desc point order
      var compare = function(a, b) {
        if (a.Points < b.Points) {
          return 1;
        }
        if (a.Points > b.Points) {
          return -1;
        }
        return 0;
      }
      userArr.sort(compare);

      // rank user by order in array
      for (var k=0; k<userArr.length; k++) {
        userArr[k].rank = k+1;
      }

      userArr = userArr.slice(0,10);

      

      var hbsObject = {
        leaders: userArr
      };
      res.render("leaderboard", hbsObject);
    })
  });
};