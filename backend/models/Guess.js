module.exports = (sequelize, DataTypes) => {
  const Guess = sequelize.define(
    "Guess",
    {
      score: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["UserId", "EventId"],
        },
      ],
      hooks: {
        afterCreate: (event, options) => {
          evaluateScoreboardStats(event);
        },
      },
    }
  );
  Guess.associate = (models) => {
    Guess.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false,
      },
    });
    Guess.belongsTo(models.Event, {
      foreignKey: {
        allowNull: false,
      },
    });
    Guess.belongsToMany(models.Scoreboard, {
      through: models.ScoreboardGuess,
    });
  };

  async function evaluateScoreboardStats(event) {
    console.log(event.dataValues);
    const { UserId, score } = event.dataValues;
    const userScoretables = (
      await sequelize.models.ScoreboardUser.findAll({
        where: { UserId },
        attributes: ["ScoreboardId"],
      })
    ).map((item) => item.ScoreboardId);
    console.log(userScoretables);
    let doesExist = false;
    for (const item of userScoretables) {
      const guess = await sequelize.models.PopularGuesses.findOne({
        where: { ScoreboardId: item, score },
      });
      const scoreboard = await sequelize.models.Scoreboard.findOne({
        where: { id: item },
      });
      await scoreboard.increment();
      if (!Object.is(guess, null)) {
        doesExist = true;
        await guess.increment();
        break;
      } else {
        await sequelize.models.PopularGuesses.create({
          ScoreboardId: item,
          score,
        });
      }
    }
  }

  return Guess;
};
