var path = require("path");

module.exports = function(app){
	app.get("/",function(req,res){
		res.sendFile(path.join(__dirname,"../public/home.html"))
	});
	app.get("/leaderboard",function(req,res){
		res.sendFile(path.join(__dirname,"../public/leaderboard.html"))
	});
	app.get("/classmates",function(req,res){
		res.sendFile(path.join(__dirname,"../public/classmates.html"))
	});

	app.get("/signin", function(req,res){
		res.sendFile(path.join(__dirname,"../views/signin.html"))
	})
};