const axios = require("axios");
const { Event, PastEvent } = require("../models");
const { getDate } = require("../date");

const createOrUpdateEvent = async (match) => {
  try {
    const event = await Event.findOne({ where: { apiId: match.apiId } });
    if (event) {
      return await Event.update(match, {
        where: { apiId: match.apiId },
      });
    } else {
      return await Event.create(match);
    }
  } catch (err) {
    return err;
  }
};

const getEvents = async () => {
  const compId = "2021,2001,2000,2002,2003,2014,2015,2018,2019";
  const dateFrom = getDate(0);
  const dateTo = getDate(2);
  try {
    const response = await axios.get(
      `${process.env.API_URI}/v4/matches/?competitions=${compId}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
      {
        headers: {
          "X-Auth-Token": `${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const matches = response.data.matches.map((match) => {
      const { competition, id, utcDate, status, homeTeam, awayTeam, score } =
        match;
      const date = utcDate.split("T")[0];
      const utcTime = utcDate.split("T")[1].split("Z")[0] + "";
      return {
        competition: competition.name,
        apiId: id,
        utcDate,
        date,
        utcTime,
        status,
        homeTeam: homeTeam.shortName || homeTeam.name,
        homeTeamCrest: homeTeam.crest,
        awayTeam: awayTeam.shortName || awayTeam,
        awayTeamCrest: awayTeam.crest,
        score:
          score.fullTime.home === null
            ? "-:-"
            : score.fullTime.home + ":" + score.fullTime.away,
      };
    });
    const events = await Promise.all(
      matches.map(async (match) => await createOrUpdateEvent(match))
    );
  } catch (err) {
    console.log(err);
  }
};
module.exports = { getEvents };
