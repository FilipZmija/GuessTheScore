module.exports = (sequelize, DataTypes) => {
  const Scoreboard = sequelize.define("Scoreboard", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    guesses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      defaultValue: 0,
    },
  });

  Scoreboard.prototype.increment = async function () {
    this.guesses++;
    await this.save();
  };

  Scoreboard.associate = (models) => {
    Scoreboard.hasMany(models.PopularGuesses);
    Scoreboard.belongsToMany(models.Users, { through: models.ScoreboardUser });
    Scoreboard.belongsToMany(models.Guess, { through: models.ScoreboardGuess });
  };
  return Scoreboard;
};
