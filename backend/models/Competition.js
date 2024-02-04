module.exports = (sequelize, DataTypes) => {
  const Competition = sequelize.define("Competition", {
    ApiId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
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
    Competition.hasMany(models.Event);
    Competition.belongsToMany(models.Scoreboard, {
      through: models.ScoreboardCompetitions,
    });
  };
  return Competition;
};
