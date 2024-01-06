const { Scoreboard, ScoreboardUser } = require("../models");
const initTable = async () => {
  const exists = await Scoreboard.findOne({ where: { name: "All players" } });
  if (!exists) {
    const mainTable = await Scoreboard.create({ name: "All players" });
    console.log(mainTable);
  }
};
const asignUserToMainScoreboard = async (userId, scoreboardId = 1) => {
  return await ScoreboardUser.create({
    UserId: userId,
    ScoreboardId: scoreboardId,
  });
};

module.exports = { initTable, asignUserToMainScoreboard };
