module.exports = (sequelize, DataTypes) => {
  const Tables = sequelize.define("Tables", {
    group: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Tables.associate = (models) => {
    Tables.hasMany(models.Teams);
    Tables.belongsTo(models.Competition);
  };
  return Tables;
};
