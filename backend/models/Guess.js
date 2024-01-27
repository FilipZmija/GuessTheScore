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
        beforeUpdate: (event) => {
          editEvaluateScoreboardStat(event);
        },
        afterCreate: (event) => {
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
    const promises = userScoretables.map(async (item) => {
      const guess = await sequelize.models.PopularGuesses.findOne({
        where: { ScoreboardId: item, score, EventId: event.EventId },
      });

      if (guess) {
        await guess.increment();
        await guess.save();
      } else {
        await sequelize.models.PopularGuesses.create({
          ScoreboardId: item,
          score,
          EventId: event.EventId,
        });
      }
    });

    Promise.all(promises);
  }
  const editEvaluateScoreboardStat = async (event) => {
    const { score: prevScore } = event._previousDataValues;
    const { UserId, EventId, score: curScore } = event.dataValues;
    if (!prevScore && curScore && prevScore === curScore) {
      return;
    }
    const userScoretables = (
      await sequelize.models.ScoreboardUser.findAll({
        where: { UserId },
        attributes: ["ScoreboardId"],
      })
    ).map((item) => item.ScoreboardId);

    const promisesSubstract = userScoretables.map(async (item) => {
      const guess = await sequelize.models.PopularGuesses.findOne({
        where: { ScoreboardId: item, score: prevScore, EventId },
      });

      if (guess) {
        await guess.decrement();
        await guess.save();
      }
    });
    const promisesAdd = userScoretables.map(async (item) => {
      const guess = await sequelize.models.PopularGuesses.findOne({
        where: { ScoreboardId: item, score: curScore, EventId: event.EventId },
      });
      console.log(guess);
      if (guess) {
        await guess.increment();
        await guess.save();
      } else {
        await sequelize.models.PopularGuesses.create({
          ScoreboardId: item,
          score: curScore,
          EventId: event.EventId,
        });
      }
    });
    Promise.all([...promisesSubstract, ...promisesAdd]);
  };

  return Guess;
};
