var express = require('express');
var db = require("../models");
var url = require('url');

module.exports = function(app){
    app.get("/api/user", function(req,res){
		//gets called when the main page loads probably
        var url_parts = url.parse(req.url, true);
		db.User.findAll({
            where: {
                id: url_parts.query.userId
            }
        }).then(function(data){
			res.json(data);
		});
	});
};