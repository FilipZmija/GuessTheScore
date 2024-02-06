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
        afterUpdate: async (event) => {
          await editEvaluateScoreboardStat(event);
        },
        afterCreate: async (event) => {
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
    const { score } = event.dataValues;
    try {
      const guess = await sequelize.models.PopularGuesses.findOne({
        where: { score, EventId: event.EventId },
      });
      await guess.increment();
    } catch (e) {
      console.error(e);
    }
  }

  const editEvaluateScoreboardStat = async (event) => {
    const { score: prevScore } = event._previousDataValues;
    const { EventId, score: curScore } = event.dataValues;
    if (
      (!prevScore && curScore && prevScore === curScore) ||
      prevScore === curScore
    ) {
      return;
    }
    const oldGuess = await sequelize.models.PopularGuesses.findOne({
      where: { score: prevScore, EventId },
    });
    if (oldGuess) {
      await oldGuess.decrement();
      await oldGuess.save();
    }
    const guess = await sequelize.models.PopularGuesses.findOne({
      where: { score: curScore, EventId: event.EventId },
    });
    if (guess) {
      await guess.increment();
      await guess.save();
    } else {
      await sequelize.models.PopularGuesses.create({
        score: curScore,
        EventId: event.EventId,
      });
    }
  };

  return Guess;
};
