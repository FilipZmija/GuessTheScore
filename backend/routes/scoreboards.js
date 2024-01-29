const express = require("express");
const router = express.Router();
const { ScoreboardUser, Scoreboard, PopularGuesses } = require("../models");
const { validateToken } = require("../auth/JWT");
const { asignUserToMainScoreboard } = require("../init/functions");
router.use(express.json({ limit: "10mb" }));
router.use((req, res, next) => {
  next();
});

router.post("/create", validateToken, async (req, res) => {
  const { name } = req.body;
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
    const scoreboard = await Scoreboard.create({ name, hash });
    await asignUserToMainScoreboard(id, scoreboard.id);
    res.status(200).json(scoreboard);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post("/assign", validateToken, async (req, res) => {
  const userId = req.user.id;
  const { hash } = req.body;
  try {
    const scoreboard = await Scoreboard.findOne({ where: { hash } });
    const association = await ScoreboardUser.create({
      UserId: userId,
      ScoreboardId: scoreboard.id,
    });
    res.status(200).json(association);
  } catch (e) {
    res.status(404).json(e);
  }
});

router.get("/:scoreboardId", validateToken, async (req, res) => {
  const { scoreboardId } = req.params;
  const { page } = req.query;
  const { id } = req.user;
  const limit = 10;
  try {
    const offset = (page - 1) * limit || 0;
    const scoreboard = await Scoreboard.findByPk(scoreboardId);
    const users = await scoreboard.getUsers({
      limit,
      offset,
      order: [["ratio", "DESC"]],
    });
    let loggedUser;
    if (users.findIndex((user) => user.id === id) === -1) {
      [loggedUser] = await scoreboard.getUsers({
        where: { id },
      });
      if (loggedUser?.ScoreboardUser.position < page * 10) {
        loggedUser = null;
      }
    } else {
      loggedUser = null;
    }
    const response = { ...scoreboard.dataValues, loggedUser, users };
    res.status(200).json({ scoreboard: response });
  } catch (e) {
    console.error(e);

    res.status(404).json(e);
  }
});

router.get("/users/all", validateToken, async (req, res) => {
  const { id } = req.user;
  try {
    const scoreboards = await ScoreboardUser.findAll({
      where: { UserId: id },
      attributes: ["ScoreboardId"],
    });
    res.status(200).json(scoreboards);
  } catch (e) {
    console.error(e);

    res.status(404).json(e);
  }
});

router.get("/popular/:id", validateToken, async (req, res) => {
  const { id } = req.params;
  const { EventId } = req.query;
  try {
    const scoreboards = await Scoreboard.findOne({
      where: { id },
      include: [
        {
          model: PopularGuesses,
          where: { EventId },
        },
      ],
      order: [[PopularGuesses, "number", "DESC"]],
    });
    const guesses = scoreboards?.PopularGuesses.reduce(
      (acc, curr) => acc + curr.number,
      0
    );
    scoreboards?.PopularGuesses.splice(3);
    res
      .status(200)
      .json({ popularGuesses: scoreboards?.PopularGuesses, guesses });
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
