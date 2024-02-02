const {
  Scoreboard,
  Users,
  Score,
  ScoreboardCompetitions,
} = require("../models");
const { getEvents } = require("../outsource/calls");
const initTable = async () => {
  const competitions = "2021,2001,2000,2002,2003,2014,2015,2018,2019".split(
    ","
  );
  const exists = await Scoreboard.findOne({ where: { name: "All players" } });
  if (!exists) {
    await Scoreboard.create({ name: "All players" });
    const association = competitions.map((comp) => {
      return { CompetitionApiId: comp, ScoreboardId: 1 };
    });
    await ScoreboardCompetitions.bulkCreate(association);
  }
};
const asignUserToMainScoreboard = async (UserId, ScoreboardId = 1) => {
  const score = await Score.create({
    UserId,
    ScoreboardId,
  });

  return [association, score];
};

const getLotsOfGames = async (daysBack, daysForward) => {
  for (let i = -daysBack; i <= daysForward; i += 8) {
    getEvents(i, i + 8);
  }
};

module.exports = {
  initTable,
  asignUserToMainScoreboard,
  getLotsOfGames,
};
