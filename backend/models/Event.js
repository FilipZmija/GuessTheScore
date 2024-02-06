module.exports = (sequelize, DataTypes, Sequelize) => {
  const Event = sequelize.define(
    "Event",
    {
      competition: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apiId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      utcDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      utcTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      score: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      guesses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      hooks: {
        beforeUpdate: (event) => {
          if (event.changed("status") && event.status === "FINISHED") {
            evaluatePoints(event, true);
            setTimeout(() => revaluateScorePositions(), 10000);
          } else if (event.changed("score") && event.status === "IN_PLAY") {
            evaluatePoints(event, false);
          }
        },
      },
    }
  );
  Event.associate = (models) => {
    Event.hasMany(models.Guess);
    Event.belongsToMany(models.Teams, { through: models.EventTeams });
    Event.belongsTo(models.Competition);
    Event.hasMany(models.PopularGuesses);
  };

  Event.prototype.increment = async function () {
    this.guesses++;
    await this.save();
  };

  Event.prototype.decrement = async function () {
    this.guesses--;
    await this.save();
  };

  const revaluateScorePositions = async () => {
    const allScoreboards = await sequelize.models.Scoreboard.findAll();
    for (let i = 0; i < allScoreboards.length; i++) {
      const scoreboard = allScoreboards[i];
      const scores = await scoreboard.getScores({
        order: [["ratio", "DESC"]],
      });
      if (scores.length > 0) {
        scores.map(async (score, index) => {
          score.update({ position: index + 1 });
        });
      }
    }
  };

  async function evaluatePoints(event, finished) {
    const eventGuesses = await sequelize.models.Guess.findAll({
      where: { EventId: event.id },
    });
    for (let i = 0; i < eventGuesses.length; i++) {
      const guess = eventGuesses[i];
      const { UserId } = guess;
      const guessedScore = guess.score.split(":").map((item) => Number(item));
      const actualScore = event.score.split(":").map((item) => Number(item));
      let points = 0;
      guessedScore[0] === actualScore[0] && points++;
      guessedScore[1] === actualScore[1] && points++;
      guessedScore[0] - guessedScore[1] === actualScore[0] - actualScore[1] &&
        points++;
      if (
        (guessedScore[0] - guessedScore[1]) *
          (actualScore[0] - actualScore[1]) >
          0 ||
        (guessedScore[0] - guessedScore[1] === 0 &&
          actualScore[0] - actualScore[1] === 0)
      ) {
        points += 2;
      }

      if (finished) {
        if (guess.points == null) {
          guess.points = points;
          await guess.save();

          const scores = await sequelize.models.Score.findAll({
            include: [
              {
                model: sequelize.models.Scoreboard,

                include: [
                  {
                    model: sequelize.models.Competition,
                    through: {
                      model: sequelize.models.ScoreboardCompetiton,
                    },
                    where: { ApiId: event.CompetitionApiId },
                  },
                ],
              },
            ],
            where: {
              UserId,
              "$Scoreboard.id$": { [Sequelize.Op.ne]: null },
            },
          });
          for (let i = 0; i < scores.length; i++) {
            const score = scores[i];
            score.guesses++;
            score.score += guess.points;
            await score.save();
          }
        } else if (guess.points && points !== guess.points) {
          guess.points = points;
          await guess.save();
          const scores = await sequelize.models.Score.findAll({
            include: [
              {
                model: sequelize.models.Scoreboard,
                include: [
                  {
                    model: sequelize.models.Competition,
                    through: {
                      model: sequelize.models.ScoreboardCompetiton,
                    },
                    where: { ApiId: event.CompetitionApiId },
                  },
                ],
              },
            ],
            where: {
              UserId,
              "$Scoreboard.id$": { [Sequelize.Op.ne]: null },
            },
          });
          for (let i = 0; i < scores.length; i++) {
            const score = scores[i];
            score.score = guess.points;
            await score.save();
          }
        }
      } else {
        guess.currentPoints = points;
        await guess.save();
      }
    }
  }

  return Event;
};
