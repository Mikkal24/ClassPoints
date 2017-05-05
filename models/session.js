module.exports = function(sequelize, DataTypes) {
  var Session = sequelize.define("Session", {
    Points: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  },
    {
      // Associate a foreign key from the class and user models to the session model.
      classMethods: {
        associate: function(models) {
          // Foreign keys are added
          Session.belongsTo(models.Class, {foreignKey: "classId"});
          Session.belongsTo(models.User, {foreignKey: "userId"});
        }
      }
    }
  );
  return Session;
};