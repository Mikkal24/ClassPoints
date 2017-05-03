CREATE DATABASE ClassPointsDB;
use ClassPointsDB;

CREATE TABLE User (
	id int NOT NULL AUTO_INCREMENT,
	fName varchar(255) NOT NULL,
	lName varchar(255) NOT NULL,
	isAdmin BOOLEAN NOT NULL,
	email varchar(255) NOT NULL
)