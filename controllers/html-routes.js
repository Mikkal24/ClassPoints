var path = require("path");

module.exports = function(app){
	app.get("/",function(req,res){
		res.sendFile(path.join(__dirname,"../views/leaderboard.html"))
	});
	app.get("/classes",function(req,res){
		res.sendFile(path.join(__dirname,"../views/classes.html"))
	});
	app.get("/",function(req,res){
		res.sendFile(path.join(__dirname,"../views/leaderboard.html"))
	});
};