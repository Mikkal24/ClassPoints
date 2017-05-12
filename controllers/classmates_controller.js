// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/classmates", function(req, res) {
    db.Session.findAll({
      include: [
        {model: db.User, as: 'User'}
      ]
    }).then(function(data) {
      
      var userArr = [];

      for (var i=0; i<data.length; i++) {
        if (userArr.length === 0){
          userArr.push({UserId: data[i].UserId, fName: data[i].User.fName, lName: data[i].User.lName, Points: data[i].points, Picture: data[i].User.picture});
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
          userArr.push({UserId: data[i].UserId, fName: data[i].User.fName, lName: data[i].User.lName, Points: data[i].points, Picture: data[i].User.picture});
        };

      };

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
      userArr.sort(compare);

      var hbsObject = {
        classmate: userArr
      };
      res.render("classmates", hbsObject);
    })
  });
  
};