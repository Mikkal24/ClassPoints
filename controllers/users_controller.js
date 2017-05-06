var express = require('express');
var db = require("../models");

module.exports = function(app){
	app.get("/user", function(req,res){
		//gets called when the main page loads probably
		var students = []
		db.User.findAll({}).then(function(data){
			var hbsObject = {
				classmate: data
			}

			res.render("classmates",hbsObject);
			//how should we filter out the student that is already logged in?
		})

	});

	app.get("/user/login", function(req,res){
		//gets called when the user logs in (finds their user record essentially)
		db.User.findOne({
			where: {
				//email is probably the most unique thing about the log in page?
				email: req.body.email,
			}
		}).then(function(data){

			res.redirect("/user");
		})
	})

	app.post("/user/newUser", function(req,res){
		console.log(req.body.fName)
		db.User.findOrCreate({
			where: {
				email: req.body.email
			}, defaults: {
				fName: req.body.fName,
				lName: req.body.lName,
				email: req.body.email,
				isAdmin: 0
			}
		}).then(function(userData){
			res.redirect('/user');
		})
	});

	app.put("/user/:id", function(req,res){

	});

};