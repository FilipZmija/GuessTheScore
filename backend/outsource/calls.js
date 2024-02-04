const axios = require("axios");
const {
  Event,
  Tables,
  Competition,
  Teams,
  EventTeams,
  TableLogs,
} = require("../models");
const { getDate } = require("../date");

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
    const existingMatches = [];
    const newMatches = [];
    await Promise.all(
      response.data.matches.map(async (match) => {
        const { competition, id, utcDate, status, homeTeam, awayTeam, score } =
          match;
        const homeId = match.homeTeam.id;
        const awayId = match.awayTeam.id;
        const date = utcDate.split("T")[0];
        const utcTime = utcDate.split("T")[1].split("Z")[0] + "";
        const matchData = {
          competition: competition.name,
          apiId: id,
          utcDate,
          date,
          utcTime,
          status,
          score:
            score.fullTime.home === null
              ? "-:-"
              : score.fullTime.home + ":" + score.fullTime.away,
          homeId,
          awayId,
          CompetitionApiId: competition.id,
        };
        const event = await Event.findOne({ where: { apiId: id } });
        event ? existingMatches.push(matchData) : newMatches.push(matchData);
      })
    );
    return [existingMatches, newMatches];
  } catch (err) {
    console.error(err);
    return [[], []];
  }
};

const createTeamsAndLogs = async (teams, TableId) => {
  try {
    const teamModels = [];
    const tableLogModels = [];
    await Promise.all(
      teams.map(async (tableItem) => {
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
        } = tableItem;
        const { id, name, shortName, crest } = tableItem.team;

        const teamModel = await Teams.findOne({ where: { ApiId: id } });
        if (!teamModel) {
          teamModels.push({
            ApiId: id,
            name,
            shortName,
            crest,
          });
        }
        const tableLogModel = await TableLogs.findOne({
          where: { TeamApiId: id, TableId },
        });
        if (!tableLogModel) {
          tableLogModels.push({
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
        }
      })
    );
    await Teams.bulkCreate(teamModels);
    await TableLogs.bulkCreate(tableLogModels);
  } catch (err) {
    return err;
  }
};

const updateTeam = async (team, TableId) => {
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
  const { id } = team.team;
  try {
    await TableLogs.update(
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
  } catch (err) {
    return err;
  }
};

const getTeamsAndTables = async () => {
  const compId = "2021,2001,2000,2002,2003,2014,2015,2018,2019".split(",");
  try {
    await Promise.all(
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

        await Promise.all(
          response.data.standings.map(async (standingItem) => {
            const { group, stage } = standingItem;
            const table = await Tables.findOne({
              where: { CompetitionApiId: competitionId, group },
            });
            let TableId;
            if (!table) {
              const newTable = await Tables.create({
                group,
                stage,
                CompetitionApiId: competitionId,
              });
              TableId = newTable.id;
            } else {
              TableId = table.id;
            }
            await createTeamsAndLogs(standingItem.table, TableId);
          })
        );
      })
    );
  } catch (e) {
    console.error(e);
  }
};

const getTeamsUpdate = async () => {
  const compId = "2021,2001,2000,2002,2003,2014,2015,2018,2019".split(",");
  try {
    await Promise.all(
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
        const tables = await Promise.all(
          response.data.standings.map(async (standingItem) => {
            const table = await Tables.findOne({
              where: { CompetitionApiId: item },
            });
            const TableId = table.id;
            await Promise.all(
              standingItem.table.map(async (tableItem) => {
                await updateTeam(tableItem, TableId);
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

module.exports = {
  getEvents,
  getTeamsAndTables,
  getTeamsUpdate,
};
