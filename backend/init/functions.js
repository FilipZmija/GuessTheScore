const { Scoreboard, ScoreboardUser, Users } = require("../models");
const { getEvents } = require("../outsource/calls");
const initTable = async () => {
  const exists = await Scoreboard.findOne({ where: { name: "All players" } });
  if (!exists) {
    const mainTable = await Scoreboard.create({ name: "All players" });
  }
};
const asignUserToMainScoreboard = async (userId, scoreboardId = 1) => {
  return await ScoreboardUser.create({
    UserId: userId,
    ScoreboardId: scoreboardId,
  });
};

const revaluateScoreboardPositions = async () => {
  const allScoreboards = await Scoreboard.findAll();

  await Promise.all(
    allScoreboards.map(async (scoreboard) => {
      const users = await scoreboard.getUsers({ order: [["ratio", "DESC"]] });
      users.map(async (user, index) => {
        user.ScoreboardUser.update({ position: index + 1 });
      });
    })
  );
};

const getLotsOfGames = async (daysBack, daysForward) => {
  for (let i = -daysBack; i <= daysForward; i += 8) {
    getEvents(i, i + 8);
  }
};

module.exports = {
  initTable,
  asignUserToMainScoreboard,
  revaluateScoreboardPositions,
  getLotsOfGames,
};
