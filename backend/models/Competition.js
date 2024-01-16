module.exports = (sequelize, DataTypes) => {
  const Competition = sequelize.define("Competition", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emblem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Competition.associate = (models) => {
    Competition.hasMany(models.Tables);
  };
  return Competition;
};
