module.exports = (sequelize, DataTypes, Sequelize) => {
  const Score = sequelize.define(
    "Score",
    {
      score: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      guesses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      ratio: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      hooks: {
        afterUpdate: async (score) => {
          if (score.changed("score") || score.changed("guesses")) {
            const ratio = score.score / (score.guesses * 5);
            if (score.getDataValue("ratio") !== ratio) {
              score.ratio = ratio;
              await score.save();
            }
          }
        },
        afterCreate: async (score) => {
          const [prevPoints, prevGuesses] = await calculatePointsBack(score);
          score.set("score", prevPoints);
          score.set("guesses", prevGuesses);
          await score.save();

          const scoreboard = await sequelize.models.Scoreboard.findOne({
            where: { id: score.ScoreboardId },
          });

          const scores = await scoreboard.getScores({
            order: [["ratio", "DESC"]],
          });

          scores.map(async (score, index) => {
            await score.update({ position: index + 1 });
          });
        },
      },
    }
  );
  Score.associate = (models) => {
    Score.belongsTo(models.Users);
    Score.belongsTo(models.Scoreboard);
  };
  const calculatePointsBack = async (event) => {
    const { UserId, ScoreboardId } = event;
    console.log(UserId, ScoreboardId);

    const scoreboard = await sequelize.models.Scoreboard.findOne({
      where: { id: ScoreboardId },
      include: [
        {
          model: sequelize.models.Competition,
          through: sequelize.models.ScoreboardCompetitions,
        },
      ],
    });
    const { calculateBack, Competitions } = scoreboard;
    const CompetitionIds = Competitions.map((comp) => {
      return { ApiId: comp.ApiId };
    });
    if (calculateBack) {
      const guesses = await sequelize.models.Guess.findAll({
        where: {
          UserId,
          "$Event.id$": { [Sequelize.Op.ne]: null },
          "$Event.Competition$": { [Sequelize.Op.ne]: null },
        },
        include: [
          {
            model: sequelize.models.Event,
            include: [
              {
                model: sequelize.models.Competition,
                where: { [Sequelize.Op.or]: CompetitionIds },
              },
            ],
          },
        ],
      });
      const previousPoints = guesses.reduce(
        (acc, curr) => {
          const { points } = curr;
          if (points != null) {
            return [acc[0] + points, acc[1] + 1];
          } else {
            return acc;
          }
        },
        [0, 0]
      );
      return previousPoints;
    } else {
      return [0, 0];
    }
  };
  return Score;
};
