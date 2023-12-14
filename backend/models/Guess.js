module.exports = (sequelize, DataTypes) => {
  const Guess = sequelize.define(
    "Guess",
    {
      score: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["UserId", "EventId"],
        },
      ],
    }
  );
  Guess.associate = (models) => {
    Guess.belongsTo(models.Users);
    Guess.belongsTo(models.Event);
  };
  return Guess;
};
