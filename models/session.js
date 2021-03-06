module.exports = function(sequelize, DataTypes) {
  var Session = sequelize.define("Session", {
    points: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
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
      // Associate a foreign key from the class and user models to the session model.
      classMethods: {
        associate: function(models) {
          // Foreign keys are added
          Session.belongsTo(models.Class, {foreignKey: "ClassId"});
          Session.belongsTo(models.User, {foreignKey: "UserId"});
        }
      }
    }
  );
  return Session;
};