module.exports = function(sequelize, Datatypes) {
	var User = sequelize.define("User",{
		fName: {
			//stores first name (at least 3 letters)
			type: Datatypes.STRING,
			allowNull: false,
			validate: {
				len:[3]
			}
		},
		lName: {
			//stores last name (at least 3 letters)
			type: Datatypes.String,
			allowNull: false,
			validate: {
				len:[3]
			}
		},
		isAdmin: {
			//determines if administrator (used for conditionals)
			type: Datatypes.Boolean,
			allowNull: false,
		},
		email: {
			//stores email obviously
			type: Datatypes.String,
			allowNull: false,
			validate: {
				len:[5]
			}
		}
	});

	return User;
}