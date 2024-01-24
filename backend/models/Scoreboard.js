module.exports = (sequelize, DataTypes) => {
  const Scoreboard = sequelize.define(
    "Scoreboard",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      guesses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue: 0,
      },
    },
    {
      hooks: {
        afterCreate: async function (scoreboard) {
          const newHash = scoreboard.hash + scoreboard.id;
          await scoreboard.setDataValue("hash", newHash);
          await scoreboard.save();
        },
      },
    }
  );

  Scoreboard.associate = (models) => {
    Scoreboard.hasMany(models.PopularGuesses);
    Scoreboard.belongsToMany(models.Users, { through: models.ScoreboardUser });
    Scoreboard.belongsToMany(models.Guess, { through: models.ScoreboardGuess });
  };
  return Scoreboard;
};
