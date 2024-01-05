module.exports = (sequelize) => {
  const ScoreboardUser = sequelize.define("ScoreboardUser", {
    indexes: [
      {
        unique: true,
        fields: ["UsersId", "ScoreboardId"],
      },
    ],
  });

  return ScoreboardUser;
};
