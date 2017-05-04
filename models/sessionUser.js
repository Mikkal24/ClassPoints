module.exports = function(sequelize, DataTypes) {
  var SessionUser = sequelize.define("SessionUser", {
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
    {
      //  Our SessionUser table has user and session foreign keys
      classMethods: {
        associate: function(models) {
          // A Session (foreignKey) is added
          SessionUser.belongsTo(models.Session, {foreignKey: "sessionId"});
          // A User (foreignKey) is added
          SessionUser.belongsTo(models.User, {foreignKey: "userId"});
        }
      }
    }
  );
  return SessionUser;
};
