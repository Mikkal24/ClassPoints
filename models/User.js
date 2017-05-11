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
			//stores last name (at least 2 letters)
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len:[2]
			}
		},
		isAdmin: {
			//determines if administrator (used for conditionals)
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
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
		picture: {
			//stores users' picture
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: 'http://placehold.it/170x100',
			validate: {
				len:[10]
			}
		},
		gitLink: {
			//stores github link obviously
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: 'https://github.com/',
			validate: {
				len:[5]
			}
		},
		googleId: {
			type: DataTypes.DOUBLE
		},
    createdAt: {
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
      allowNull: true
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