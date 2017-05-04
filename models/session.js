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
      // Associate a foreign key from the class model to the session model.
      classMethods: {
        associate: function(models) {
          // A class (foreignKey)
          Session.belongsTo(models.Class, {foreignKey: "classId"});
        }
      }
    }
  );
  return Session;
};