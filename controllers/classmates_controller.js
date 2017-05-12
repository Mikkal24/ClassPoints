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
      var uid = 1;
      var userPoints = 0;
      // logic to sum points by userid
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
        userArr.push({UserId: j-1, fName: data[j-1].User.fName, lName: data[j-1].User.lName, Points: userPoints, Picture: data[j-1].User.picture, Github: data[j-1].User.gitLink});
        userPoints = 0;
      }

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

  ////////////////////
  // class route renders class page
  // app.get("/classmates", function(req, res) {
  //   db.User.findAll({
  //     include: [
  //       {model: db.Session, as: 'Session'}
  //     ]
  //   }).then(function(data) {

  //     var userArr = [];
  //     var uid = 1;
  //     var userPoints = 0;
  //     // logic to sum points by userid then display only top 10
  //     // find highest userid
  //     var highuid = 0;
  //     for (var i=0; i<data.length; i++) {
  //       if (data[i].UserId > highuid) {
  //         highuid = data[i].UserId
  //       }
  //     }
  //     // sum points by userid
  //     for (var j=1; j<highuid+1; j++) {
  //       // add all points for a given user
  //       for (var i=0; i<data.length; i++) {
  //         if (data[i].UserId == j) {
  //           userPoints += data[i].points;
  //         }
  //       }
  //       userArr.push({UserId: j-1, fName: data[j-1].User.fName, lName: data[j-1].User.lName, Points: userPoints});
  //       userPoints = 0;
  //     }
      
  //     // sort userArr in desc point order
  //     var compare = function(a, b) {
  //       if (a.fName < b.fName) {
  //         return -1;
  //       }
  //       if (a.fName > b.fName) {
  //         return 1;
  //       }
  //       return 0;
  //     }
  //     userArr.sort(compare);

  //     var hbsObject = {
  //       classmate: userArr
  //     };
  //     res.render("classmates", hbsObject);
  //   })
  // });

};