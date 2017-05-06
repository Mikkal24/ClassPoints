module.exports = function(sequelize, DataTypes) {
  var Class = sequelize.define("Class", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdAt: {
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
      allowNull: false
    }
  },
    {
      classMethods: {
        associate: function(models) {
          // One to many relationship to our session table
          Class.hasMany(models.Session, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    });
  return Class;
};
