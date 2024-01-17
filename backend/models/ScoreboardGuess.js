module.exports = (sequelize) => {
  const ScoreboardGuess = sequelize.define(
    "ScoreboardGuess",
    {},
    {
      indexes: [
        {
          unique: true,
          fields: ["GuessId", "ScoreboardId"],
        },
      ],
    }
  );

  return ScoreboardGuess;
};
