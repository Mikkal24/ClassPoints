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

      for (var i=0; i<data.length; i++) {
        if (userArr.length === 0){
          userArr.push({UserId: data[i].UserId, fName: data[i].User.fName, lName: data[i].User.lName, Points: data[i].points});
          continue;
        };
        var found = false
        for(var j=0; j<userArr.length; j++){
          if (userArr[j].UserId === data[i].UserId){
            userArr[j].Points += data[i].points;
            found = true;
          };
        };
        if (!found){
          userArr.push({UserId: data[i].UserId, fName: data[i].User.fName, lName: data[i].User.lName, Points: data[i].points});
        };

      };

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