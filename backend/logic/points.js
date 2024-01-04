const { Guess, Scoreboard, ScoreboardUser } = require("../models");
const initTable = async () => {
  const exists = await Scoreboard.findOne({ where: { name: "All players" } });
  if (!exists) {
    const mainTable = await Scoreboard.create({ name: "All players" });
    console.log(mainTable);
  }
};
const asignUserToMainScoreboard = async (tabeleId = 1, userId) => {
  const association = await ScoreboardUser.create({
    userId: userId,
    tabeleId: tabeleId,
  });
};

module.exports = { initTable, asignUserToMainScoreboard };
