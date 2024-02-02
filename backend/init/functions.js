const {
  Scoreboard,
  EventTeams,
  Score,
  ScoreboardCompetitions,
  Event,
  PopularGuesses,
} = require("../models");
const { getEvents } = require("../outsource/calls");
const guessesData = require("../init/data");

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

const updateEvents = async (matches) => {
  try {
    await Promise.all(
      matches.map(async (match) => {
        const { utcDate, date, utcTime, status, score } = match;
        await Event.update(
          { utcDate, date, utcTime, status, score },
          {
            where: { apiId: match.apiId },
            individualHooks: true,
          }
        );
      })
    );
  } catch (err) {
    console.error(err);
  }
};

const createEvents = async (matches) => {
  try {
    const events = await Event.bulkCreate(matches);
    const associationsHome = events.map((event, index) => {
      return {
        homeOrAway: "home",
        TeamApiId: matches[index].homeId,
        EventId: event.id,
      };
    });
    const associationsAway = events.map((event, index) => {
      return {
        homeOrAway: "away",
        TeamApiId: matches[index].awayId,
        EventId: event.id,
      };
    });
    await EventTeams.bulkCreate([...associationsHome, ...associationsAway]);
    return events;
  } catch (err) {
    console.error(err);
  }
};
const addPopularGuesses = async (events) => {
  const scoreboards = await Scoreboard.findAll();

  const popularGuesses = guessesData
    .map((item) =>
      scoreboards
        .map((scoreboard) =>
          events.map((event) => {
            return {
              ScoreboardId: scoreboard.id,
              score: item,
              EventId: event.id,
            };
          })
        )
        .flat()
    )
    .flat();

  await PopularGuesses.bulkCreate(popularGuesses);
};
const getLotsOfGames = async (daysBack = 0, daysForward = 0) => {
  const exisitingMatches = [];
  const newMatches = [];
  if (Math.abs(daysForward - daysBack) > 0) {
    for (let i = daysBack; i <= daysForward; i += 8) {
      const [toUpdate, toCreate] = await getEvents(i, i + 8);
      exisitingMatches.push(...toUpdate);
      newMatches.push(...toCreate);
    }
  } else {
    const [toUpdate, toCreate] = await getEvents(0, 2);
    exisitingMatches.push(...toUpdate);
    newMatches.push(...toCreate);
  }

  await updateEvents(exisitingMatches);
  const newEvents = await createEvents(newMatches);
  await addPopularGuesses(newEvents);
};

module.exports = {
  initTable,
  asignUserToMainScoreboard,
  getLotsOfGames,
};
