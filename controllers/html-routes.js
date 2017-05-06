var path = require("path");

module.exports = function(app){
	app.get("/",function(req,res){
		res.sendFile(path.join(__dirname,"../public/leaderboard.html"))
	});
	app.get("/leaderboard",function(req,res){
		res.sendFile(path.join(__dirname,"../public/leaderboard.html"))
	});
	app.get("/classes",function(req,res){
		res.sendFile(path.join(__dirname,"../public/classes.html"))
	});
	app.get("/classmates",function(req,res){
		res.sendFile(path.join(__dirname,"../public/classmates.html"))
	});
};