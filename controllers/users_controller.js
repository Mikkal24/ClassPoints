var express = require('express');
var db = require("../models");

module.exports = function(app){
	app.get("/user", function(req,res){
		//gets called when the main page loads probably
		var students = []
		db.User.findAll({}).then(function(data){
			res.json(data);
			//how should we filter out the student that is already logged in?
		})

	});

	app.get("/user/login", function(req,res){
		//gets called when the user logs in (finds their user record essentially)
		db.user.findOne({
			where: {
				//email is probably the most unique thing about the log in page?
				email: req.params.email,
			}
		}).then(function(data){
			var hbsObject = [data]

			res.render("index",hbsObject)
		})
	})

	app.post("/user", function(req,res){

	});

	app.put("/user/:id", function(req,res){

	});

};