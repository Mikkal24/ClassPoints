var express = require('express');
var db = require("../models");

module.exports = function(app) {
	app.get("/user", function(req, res) {
		//gets called when the main page loads probably
		var students = []
		db.User.findAll({}).then(function (data) {
			var hbsObject = {
				classmate: data
			}
			res.render("classmates", hbsObject);
			//how should we filter out the student that is already logged in?
		})

	});

	app.get("/userData", function(req,res){
		if(typeof req.user != "undefined"){
		res.json(req.user[0]);
		console.log(req.user[0]);
		} else {

			res.redirect("/");
		}
	})

	app.post("/user/login", function(req, res) {
		//gets called when the user logs in (finds their user record essentially)
		db.User.findOne({
			where: {
				//email is probably the most unique thing about the log in page?
				email: req.body.email,
			}
		}).then(function(data) {
			res.json(data.id);
		})
	})
	
	app.put("/user/:id", function(req,res){
		//controller method to add points to the user record
		db.User.update({
			 points: sequelize.literal('points+1'), 
			 	where: {
			 		id: req.param.id
			 	}
			 
		});
	});

	app.post("/user/newUser", function(req, res) {
		//to add new users to the database when create user button is clicked
		console.log(req.body.fName)
		db.User.findOrCreate({
			where: {
				email: req.body.email
			}, defaults: {
				fName: req.body.firstname,
				lName: req.body.lastname,
				email: req.body.email,
				isAdmin: 0
			}
		}).then(function (userData) {
			res.redirect('/user');
		})
	});


//wasn't sure what's going on down here
	app.put("user/:id", function(req, res) {
		//update points by one
		db.User.update({
			where: {
				id: req.params.id
			}
		}).then(function(data) {
			app.post("/user/newUser", function(req, res) {
				console.log(req.body.fName)
				db.User.findOrCreate({
					where: {
						email: req.body.email
					}, defaults: {
						fName: req.body.firstname,
						lName: req.body.lastname,
						email: req.body.email,
						isAdmin: 0
					}
				}).then(function (userData) {
					res.redirect('/user');
				})
			});
			app.put("/user/:id", function (req, res) {

			});
		})
	})
}
