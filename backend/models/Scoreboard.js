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
      calculateBack: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      hooks: {
        afterCreate: async function (scoreboard) {
          const newHash = scoreboard.hash + scoreboard.id + "";
          await scoreboard.setDataValue("hash", newHash);
          await scoreboard.save();
        },
      },
    }
  );

  Scoreboard.associate = (models) => {
    Scoreboard.hasMany(models.Score);
    Scoreboard.belongsToMany(models.Competition, {
      through: models.ScoreboardCompetitions,
    });

    Scoreboard.belongsToMany(models.Guess, { through: models.ScoreboardGuess });
  };
  return Scoreboard;
};
