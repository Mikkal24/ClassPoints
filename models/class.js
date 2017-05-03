module.exports = function(sequelize, DataTypes) {
  var Class = sequelize.define("Class", {
    instructor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Class;
};
