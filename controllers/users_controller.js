var express = require('express');
var router = express.Router();
var user = require('../models/User.js');

router.get("/user", function(req,res){
	//gets called when the main page loads probably
	var students = []
	user.findAll({}).then(function(data){
		//how should we filter out the student that is already logged in?
	})
});

router.get("/user/login", function(req,res){
	//gets called when the user logs in (finds their user record essentially)
	user.findOne({
		where: {
			//email is probably the most unique thing about the log in page?
			email: req.params.email,
		}
	}).then(function(data){
		var hbsObject = [data]

		res.render("index",hbsObject)
	})
})

router.post("/user", function(req,res){

});

router.put("/user/:id", function(req,res){

});

module.exports = router;