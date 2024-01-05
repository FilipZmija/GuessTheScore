module.exports = (sequelize, DataTypes) => {
  const Scoreboard = sequelize.define("Scoreboard", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    maxPoints: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  Scoreboard.associate = (models) => {
    Scoreboard.belongsToMany(models.Users, { through: models.ScoreboardUser });
    Scoreboard.belongsToMany(models.Guess, { through: models.GuessScoreboard });
  };
  return Scoreboard;
};
