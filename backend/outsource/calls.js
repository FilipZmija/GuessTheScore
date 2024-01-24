const axios = require("axios");
const {
  Event,
  Tables,
  Competition,
  Teams,
  TeamsTables,
  EventTeams,
  TableLogs,
} = require("../models");
const { getDate } = require("../date");

const createOrUpdateEvent = async (match) => {
  try {
    const existingEvent = await Event.findOne({
      where: { apiId: match.apiId },
    });
    const { homeId, awayId } = match;
    const associationData = [
      { id: homeId, homeOrAway: "home" },
      { id: awayId, homeOrAway: "away" },
    ];
    if (existingEvent) {
      const { utcDate, date, utcTime, status, score } = match;

      const [, event] = await Event.update(
        { utcDate, date, utcTime, status, score },
        {
          where: { apiId: match.apiId },
          individualHooks: true,
        }
      );

      const association = await Promise.all(
        associationData.map(async (item) => {
          await EventTeams.update(
            {
              TeamApiId: item.id,
            },
            {
              where: {
                homeOrAway: item.homeOrAway,
                EventId: event[0].id,
              },
            }
          );
        })
      );

      return [event, association];
    } else {
      const event = await Event.create(match);

      const association = await Promise.all(
        associationData.map(async (item) => {
          await EventTeams.create({
            homeOrAway: item.homeOrAway,
            TeamApiId: item.id,
            EventId: event.id,
          });
        })
      );
      console.log(association);
      return [event, association];
    }
  } catch (err) {}
};
const getEvents = async (start = 0, end = 2) => {
  const compId = "2021,2001,2000,2002,2003,2014,2015,2018,2019";
  const dateFrom = getDate(start);
  const dateTo = getDate(end);

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
      const homeId = match.homeTeam.id;
      const awayId = match.awayTeam.id;
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
        homeId,
        awayId,
        CompetitionApiId: competition.id,
      };
    });
    const events = await Promise.all(
      matches.map(async (match) => await createOrUpdateEvent(match))
    );
  } catch (err) {
    console.log(err);
  }
};

const createOrUpdateTeam = async (team, TableId) => {
  const {
    position,
    playedGames,
    form,
    won,
    draw,
    lost,
    points,
    goalsFor,
    goalsAgainst,
    goalDifference,
  } = team;
  const { id, name, shortName, crest } = team.team;
  try {
    const teamModel = await Teams.findOne({ where: { ApiId: id } });

    const tableLogModel = await TableLogs.findOne({
      where: { TeamApiId: id, TableId },
    });

    if (!teamModel) {
      const team = await Teams.create({
        ApiId: id,
        name,
        shortName,
        crest,
      });
    }

    if (!tableLogModel) {
      const tableLog = await TableLogs.create({
        position,
        playedGames,
        form,
        won,
        draw,
        lost,
        points,
        goalsFor,
        goalsAgainst,
        goalDifference,
        TableId,
        TeamApiId: id,
      });
    } else {
      const tableLog = await TableLogs.update(
        {
          position,
          playedGames,
          form,
          won,
          draw,
          lost,
          points,
          goalsFor,
          goalsAgainst,
          goalDifference,
        },
        {
          where: { TeamApiId: id, TableId },
          individualHooks: true,
        }
      );
    }
  } catch (err) {
    return err;
  }
};

const getTeamsAndTables = async () => {
  const compId = "2021,2001,2000,2002,2003,2014,2015,2018,2019".split(",");

  try {
    const responses = await Promise.all(
      compId.map(async (item) => {
        const response = await axios.get(
          `${process.env.API_URI}/v4/competitions/${item}/standings`,
          {
            headers: {
              "X-Auth-Token": `${process.env.API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );
        const { name, emblem, id } = response.data.competition;
        let competitionId;
        const competition = await Competition.findOne({
          where: { ApiId: id },
        });
        competitionId = competition?.ApiId || undefined;

        if (!competition) {
          const competition = await Competition.create({
            name,
            emblem,
            ApiId: id,
          });
          competitionId = competition.ApiId;
        }

        const tables = await Promise.all(
          response.data.standings.map(async (standingItem) => {
            const { group, stage } = standingItem;
            const table = await Tables.findOne({
              where: { CompetitionApiId: competitionId },
            });
            let TableId;
            if (!table) {
              const table = await Tables.create({
                group,
                stage,
                CompetitionApiId: competitionId,
              });
              TableId = table.id;
            } else {
              const [numberOfChanges, table] = await Tables.update(
                {
                  group,
                  stage,
                },
                {
                  where: { CompetitionApiId: competitionId, group },
                  individualHooks: true,
                }
              );
              TableId = table[0].id;
            }
            const teams = await Promise.all(
              standingItem.table.map(async (tableItem) => {
                await createOrUpdateTeam(tableItem, TableId);
              })
            );
          })
        );
      })
    );
  } catch (e) {
    console.error(e);
  }
};
module.exports = { getEvents, createOrUpdateEvent, getTeamsAndTables };
