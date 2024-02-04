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
        afterBulkCreate: async (event) => {
          // await addPopularGuesses(event);
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

    await Promise.all(
      allScoreboards.map(async (scoreboard) => {
        const scores = await scoreboard.getScores({
          order: [["ratio", "DESC"]],
        });
        if (scores.length > 0) {
          scores.map(async (score, index) => {
            score.update({ position: index + 1 });
          });
        }
      })
    );
  };

  async function evaluatePoints(event, finished) {
    const eventGuesses = await sequelize.models.Guess.findAll({
      where: { EventId: event.id },
    });
    await Promise.all(
      eventGuesses.map(async (guess) => {
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
          await guess.save();
          const user = await sequelize.models.Users.findOne({
            where: { id: UserId },
          });

          if (guess.points == null) {
            guess.points = points;
            try {
              user.guesses += 1;
              user.points += guess.points;
            } catch (err) {
              console.error(err);
              console.log(user);
            }

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
            console.log(scores);
            await Promise.all(
              scores.map(async (score) => {
                score.guesses++;
                score.score += guess.points;
                await score.save();
              })
            );
            await guess.save();
            await user.save();
          } else if (guess.points && points !== guess.points) {
            guess.points = points;
            user.points += guess.points - points;
            await user.save();
            await guess.save();
          }
        } else {
          guess.currentPoints = points;
          await guess.save();
        }
      })
    );
  }

  async function addPopularGuesses(events) {
    const scoreboards = await sequelize.models.Scoreboard.findAll();
    const eventIds = events.map((event) => event.id);
    const popularGuesses = guessesData
      .map((item) =>
        scoreboards
          .map((scoreboard) =>
            eventIds.map((id) => {
              return {
                ScoreboardId: scoreboard.id,
                score: item,
                EventId: id,
              };
            })
          )
          .flat()
      )
      .flat();
    const guesses = await sequelize.models.PopularGuesses.bulkCreate(
      popularGuesses
    );
  }

  return Event;
};
