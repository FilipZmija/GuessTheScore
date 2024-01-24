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
    Tables.belongsTo(models.Competition);
    Tables.hasMany(models.TableLogs);
  };
  return Tables;
};
