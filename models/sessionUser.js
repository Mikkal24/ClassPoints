module.exports = function(sequelize, DataTypes) {
  var SessionUser = sequelize.define("SessionUser", {
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
    {
      // We're saying that we want our SessionUser table to have user and session foreign keys
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Post can't be made
          SessionUser.belongsTo(models.Session, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return SessionUser;
};
