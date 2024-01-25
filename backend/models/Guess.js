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
      currentPoints: {
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
        beforeUpdate: async (event) => {
          await editEvaluateScoreboardStat(event);
          await evaluateScoreboardStats(event);
        },
        afterCreate: async (event, options) => {
          await evaluateScoreboardStats(event);
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
    const { UserId, score } = event.dataValues;
    const userScoretables = (
      await sequelize.models.ScoreboardUser.findAll({
        where: { UserId },
        attributes: ["ScoreboardId"],
      })
    ).map((item) => item.ScoreboardId);
    const eventObj = await sequelize.models.Event.findOne({
      where: { id: event.EventId },
    });
    await eventObj.increment();
    await eventObj.save();
    for (const item of userScoretables) {
      const guess = await sequelize.models.PopularGuesses.findOne({
        where: { ScoreboardId: item, score, EventId: event.EventId },
      });

      if (!Object.is(guess, null)) {
        await guess.increment();
        await guess.save();
        break;
      } else {
        await sequelize.models.PopularGuesses.create({
          ScoreboardId: item,
          score,
          EventId: event.EventId,
        });
      }
    }
  }
  const editEvaluateScoreboardStat = async (event) => {
    const { score } = event._previousDataValues;
    const { UserId, EventId } = event.dataValues;
    const userScoretables = (
      await sequelize.models.ScoreboardUser.findAll({
        where: { UserId },
        attributes: ["ScoreboardId"],
      })
    ).map((item) => item.ScoreboardId);
    for (const item of userScoretables) {
      const eventObj = await sequelize.models.Event.findOne({
        where: { id: event.EventId },
      });
      const guess = await sequelize.models.PopularGuesses.findOne({
        where: { ScoreboardId: item, score, EventId },
      });
      await eventObj.decrement();
      await eventObj.save();

      if (!Object.is(guess, null)) {
        doesExist = true;
        await guess.decrement();
        await guess.save();
        break;
      }
    }
  };

  return Guess;
};
