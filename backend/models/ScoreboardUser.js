module.exports = (sequelize) => {
  const ScoreboardUser = sequelize.define("ScoreboardUser", {
    indexes: [
      {
        unique: true,
        fields: ["UserId", "ScoreboardId"],
      },
    ],
  });

  return ScoreboardUser;
};
