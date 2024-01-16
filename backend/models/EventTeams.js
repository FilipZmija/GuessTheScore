module.exports = (sequelize, DataTypes) => {
  const EventTeams = sequelize.define(
    "EventTeams",
    {
      homeOrAway: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["EventId", "TeamId"],
        },
      ],
    }
  );

  return EventTeams;
};
