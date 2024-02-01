const Competition = require("./Competition");

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
          const { ScoreboardId } = event;
          const scoreboard = await sequelize.models.Scoreboard.findOne({
            where: { id: ScoreboardId },
          });

          const users = await scoreboard.getUsers({
            order: [["ratio", "DESC"]],
          });

          users.map(async (user, index) => {
            await user.ScoreboardUser.update({ position: index + 1 });
          });
        },
      },
    }
  );
  ScoreboardUser.associate = (models) => {
    ScoreboardUser.belongsTo(models.Users);
    ScoreboardUser.belongsTo(models.Scoreboard);
  };
  return ScoreboardUser;
};
