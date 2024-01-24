module.exports = (sequelize, DataTypes) => {
  const ScoreboardUser = sequelize.define(
    "ScoreboardUser",
    {
      position: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["UserId", "ScoreboardId"],
        },
      ],
      hooks: {
        afterCreate: async (event) => {
          console.log(event.ScoreboardId);
          const { ScoreboardId } = event;
          const scoreboard = await sequelize.models.Scoreboard.findOne({
            where: { id: ScoreboardId },
          });

          const users = await scoreboard.getUsers({
            order: [["ratio", "DESC"]],
          });
          console.log(users);

          users.map(async (user, index) => {
            await user.ScoreboardUser.update({ position: index + 1 });
          });
        },
      },
    }
  );

  return ScoreboardUser;
};
