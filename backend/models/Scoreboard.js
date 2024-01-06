module.exports = (sequelize, DataTypes) => {
  const Scoreboard = sequelize.define("Scoreboard", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
  });
  Scoreboard.associate = (models) => {
    Scoreboard.belongsToMany(models.Users, { through: models.ScoreboardUser });
  };
  return Scoreboard;
};
