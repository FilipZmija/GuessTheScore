const { createOrUpdateEvent } = require("./outsource/calls");
const testLiveGame = () => {
  const match = {
    competition: "TEST Primera Division",
    apiId: 15,
    utcDate: "2024-01-06T16:00:00.000Z",
    date: "2024-01-25",
    utcTime: "16:00:00",
    // status: "TIMED",
    // status: "IN_PLAY",
    status: "FINISHED",
    homeTeam: "TEST_Osasuna",
    homeTeamCrest: "https://crests.football-data.org/79.svg",
    awayTeam: "TEST_Almería",
    awayTeamCrest: "https://crests.football-data.org/267.png",
    // score: "-:-",
    // score: "0:0",
    score: "2:0",
  };
  createOrUpdateEvent(match);
};
module.exports = { testLiveGame };
