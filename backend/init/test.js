const { Guess, Users, Event } = require("../models");
const bcrypt = require("bcrypt");
const { getDate } = require("../date");
const { faker } = require("@faker-js/faker");
const { Op } = require("sequelize");
const delay = (time) => {
  return new Promise((reslove) => setTimeout(reslove, time));
};
const randomByEulerDist = (array) => {
  const n = array.length;
  const probabilities = Array.from(
    { length: n },
    (_, i) => 1 / Math.exp(i + 1)
  );
  const totalProbability = probabilities.reduce((acc, prob) => acc + prob, 0);
  const normalizedProbabilities = probabilities.map(
    (prob) => prob / totalProbability
  );
  const randomValue = Math.random();

  let cumulativeProbability = 0;
  for (let i = 0; i < n; i++) {
    cumulativeProbability += normalizedProbabilities[i];
    if (randomValue <= cumulativeProbability) {
      return array[i];
    }
  }

  return array[n - 1];
};

const createUser = async () => {
  await Users.create({ username: "test", password: "test" });
  for (let i = 0; i <= 1000; i++) {
    const username = faker.internet.userName();
    const hash = await bcrypt.hash(username, 10);
    await Users.create({ username, password: hash });
  }
};

const testLiveGame = async (date) => {
  const users = await Users.findAll({ limit: 1000 });
  const games = await Event.findAll(
    date
      ? { where: { date: getDate(date) } }
      : { where: { date: { [Op.gte]: getDate(0) } } }
  );
  await delay(2000);
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
    "0:1",
    "0:2",
    "1:2",
    "1:3",
  ];

  const guesses = [];
  games.map(async (game) => {
    for (let i = scores.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [scores[i], scores[j]] = [scores[j], scores[i]];
    }
    users.map(async (user) => {
      const score = randomByEulerDist(scores);
      console.log(score);
      guesses.push({
        score,
        UserId: user.id,
        EventId: game.id,
      });
    });
  });

  for (i = 0; i < guesses.length; i++) {
    await Guess.create(guesses[i]);
  }
};
module.exports = { testLiveGame, createUser };
