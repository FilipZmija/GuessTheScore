module.exports = (sequelize, DataTypes) => {
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
      homeTeam: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      homeTeamCrest: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      awayTeam: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      awayTeamCrest: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      score: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeUpdate: (event, options) => {
          console.log("beforeUpdate");
          if (event.changed("status") && event.status === "FINISHED") {
            console.log("FINISHING and CALCU");
            evaluatePoints(event);
          }
        },
      },
    }
  );
  Event.associate = (models) => {
    Event.hasMany(models.Guess);
    Event.belongsToMany(models.Teams, { through: models.EventTeams });
  };

  async function evaluatePoints(event) {
    const eventGuesses = await sequelize.models.Guess.findAll({
      where: { EventId: event.id },
    });
    await Promise.all(
      eventGuesses.map(async (guess) => {
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
        guess.points = points;
        const user = await sequelize.models.Users.findOne({
          where: { id: guess.UserId },
        });
        user.maxPoints += 5;
        user.points += guess.points;
        await guess.save();
        await user.save();
      })
    );
  }
  return Event;
};
