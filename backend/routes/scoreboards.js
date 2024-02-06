const express = require("express");
const router = express.Router();
const {
  Score,
  Scoreboard,
  PopularGuesses,
  Users,
  ScoreboardCompetitions,
} = require("../models");
const { validateToken } = require("../auth/JWT");
const { asignUserToMainScoreboard } = require("../init/functions");
router.use(express.json({ limit: "10mb" }));
router.use((req, res, next) => {
  next();
});

router.post("/create", validateToken, async (req, res) => {
  const { name, competitions, calculateBack } = req.body;
  const { id } = req.user;
  let hash = "";
  const alphanumericSymbols =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < 8; i++) {
    hash +=
      alphanumericSymbols[
        Math.floor(Math.random() * alphanumericSymbols.length)
      ];
  }
  try {
    const scoreboard = await Scoreboard.create({ name, calculateBack, hash });
    const association = competitions.map((comp) => {
      return { CompetitionApiId: comp, ScoreboardId: scoreboard.id };
    });
    const scoreboardAssociation = await ScoreboardCompetitions.bulkCreate(
      association
    );
    await asignUserToMainScoreboard(id, scoreboard.id);
    res.status(200).json(scoreboard);
  } catch (e) {
    res.status(404).send(e);
    console.error(e);
  }
});

router.post("/assign", validateToken, async (req, res) => {
  const UserId = req.user.id;
  const { hash } = req.body;
  try {
    const scoreboard = await Scoreboard.findOne({ where: { hash } });
    const [association, score] = await asignUserToMainScoreboard(
      UserId,
      scoreboard.id
    );
    res.status(200).json(association);
  } catch (e) {
    res.status(404).json(e);
  }
});
router.get("/new/:scoreboardId", validateToken, async (req, res) => {
  const { scoreboardId } = req.params;
  const { page } = req.query;
  const { id } = req.user;
  const limit = 10;
  try {
    const offset = (page - 1) * limit || 0;
    const scoreboard = await Scoreboard.findByPk(scoreboardId);
    const scores = await scoreboard.getScores({
      limit,
      offset,
      order: [["position", "ASC"]],
      include: [{ model: Users }],
    });

    let loggedUser;
    if (scores.findIndex((score) => score.UserId === id) === -1) {
      [loggedUser] = await scoreboard.getScores({
        where: { UserId: id },
        include: [{ model: Users }],
      });
      if (loggedUser?.position < page * 10) {
        loggedUser = null;
      }
    } else {
      loggedUser = null;
    }
    const response = {
      ...scoreboard.dataValues,
      loggedUser,
      scores,
    };
    res.status(200).json({ scoreboard: response });
  } catch (e) {
    console.error(e);

    res.status(404).json(e);
  }
});

router.get("/users/all", validateToken, async (req, res) => {
  const { id } = req.user;
  try {
    const scoreboards = await Score.findAll({
      where: { UserId: id },
      attributes: ["ScoreboardId"],
    });
    res.status(200).json(scoreboards);
  } catch (e) {
    console.error(e);

    res.status(404).json(e);
  }
});

router.get("/popular", validateToken, async (req, res) => {
  const { EventId } = req.query;
  try {
    const popularGuesses = await PopularGuesses.findAll({
      where: { EventId },
      order: [["number", "DESC"]],
    });
    const guesses = popularGuesses.reduce((acc, curr) => acc + curr.number, 0);
    popularGuesses.splice(3);
    res.status(200).json({ popularGuesses: popularGuesses, guesses });
  } catch (e) {
    console.error(e);
    res.status(404).json(e);
  }
});

router.get("/", validateToken, async (req, res) => {
  try {
    const tables = await Scoreboard.findAll();
    res.status(200).json({ tables });
  } catch (e) {
    res.status(404).json(e);
  }
});

module.exports = router;
