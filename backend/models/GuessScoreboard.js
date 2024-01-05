module.exports = (sequelize) => {
  const GuessScoreboard = sequelize.define("GuessScoreboard", {
    indexes: [
      {
        unique: true,
        fields: ["GuessId", "ScoreboardId"],
      },
    ],
  });

  return GuessScoreboard;
};
