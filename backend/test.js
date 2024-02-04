const { Guess, Users } = require("./models");
const bcrypt = require("bcrypt");

const delay = (time) => {
  return new Promise((reslove) => setTimeout(reslove, time));
};
const createUser = async () => {
  for (let i = 3; i <= 100; i++) {
    const username = `user${i}`;
    const hash = await bcrypt.hash(username, 10);
    await Users.create({ username, password: hash });
  }
};
const testLiveGame = async (apiId, EventId) => {
  const match = {
    CompetitionApiId: 2021,
    competition: "TEST Primera Division",
    apiId: apiId,
    utcDate: "2024-02-01T16:00:00.000Z",
    date: "2024-02-01",
    utcTime: "16:00:00",
    status: "TIMED",
    // status: "IN_PLAY",
    // status: "FINISHED",
    homeTeam: "TEST_Osasuna",
    homeTeamCrest: "https://crests.football-data.org/79.svg",
    awayTeam: "TEST_Almería",
    awayTeamCrest: "https://crests.football-data.org/267.png",
    score: "-:-",
    // score: "0:0",
    // score: "2:0",
  };

  await delay(2000);
  const users = await Users.findAll({ limit: 10 });
  const scores = [
    "1:0",
    "1:1",
    "2:0",
    "2:1",
    "2:2",
    "3:0",
    "3:1",
    "3:2",
    "3:3",
    "4:0",
    "4:1",
    "4:2",
    "4:3",
    "4:4",
    "0:1",
    "0:2",
    "1:2",
    "1:3",
    "2:3",
    "3:4",
  ];

  const guesses = await Promise.all(
    users.map(async (user) => {
      const index = Math.floor(Math.random() * scores.length);
      const guess = await Guess.create(
        {
          score: scores[index],
          UserId: user.id,
          EventId,
        },
        {
          individualHooks: true,
        }
      );
    })
  );

  await delay(10000);
};
module.exports = { testLiveGame, createUser };
