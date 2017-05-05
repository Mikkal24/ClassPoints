module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User",{
		fName: {
			//stores first name (at least 3 letters)
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len:[3]
			}
		},
		lName: {
			//stores last name (at least 3 letters)
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len:[3]
			}
		},
		isAdmin: {
			//determines if administrator (used for conditionals)
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		email: {
			//stores email obviously
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len:[5]
			}
		},
		gitLink: {
			//stores github link obviously
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len:[5]
			}
		}
	},
	{
      classMethods: {
        associate: function(models) {
        //   one to many relationship to our session table
          User.hasMany(models.Session, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    });
	return User;
}