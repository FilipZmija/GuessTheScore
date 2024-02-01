module.exports = (sequelize) => {
  const ScoreboardCompetitions = sequelize.define(
    "ScoreboardCompetitions",
    {},
    {
      indexes: [
        {
          unique: true,
          fields: ["CompetitionApiId", "ScoreboardId"],
        },
      ],
    }
  );

  return ScoreboardCompetitions;
};
