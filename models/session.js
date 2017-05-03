module.exports = function(sequelize, DataTypes) {
  var Session = sequelize.define("Session", {
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
    {
      // Associate a foreign key from the session model to the class model.
      classMethods: {
        associate: function(models) {
          // An class (foreignKey) is required or a Session can't be made
          Session.belongsTo(models.Class, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return Session;
};