const express = require("express");
const router = express.Router();
const {
  ScoreboardUser,
  Users,
  Scoreboard,
  PopularGuesses,
} = require("../models");
const { validateToken } = require("../auth/JWT");
router.use(express.json({ limit: "10mb" }));
router.use((req, res, next) => {
  next();
});

router.post("/create", validateToken, async (req, res) => {
  const { name } = req.body;
  try {
    const scoreboard = await Scoreboard.create({ name });
    res.status(200).json(scoreboard);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post("/assign", validateToken, async (req, res) => {
  const userId = req.user.id;
  const { scoreboardId } = req.body;
  try {
    const association = await ScoreboardUser.create({
      UserId: userId,
      ScoreboardId: scoreboardId,
    });
    console.log(association);
    res.status(200).json(association);
  } catch (e) {
    res.status(404).json(e);
  }
});

router.get("/:scoreboardId", validateToken, async (req, res) => {
  const { scoreboardId } = req.params;
  try {
    const scoreboard = await Scoreboard.findByPk(scoreboardId, {
      include: [
        {
          model: Users,
          through: { model: ScoreboardUser },
        },
      ],
      order: [[Users, "points", "DESC"]],
    });
    res.status(200).json({ scoreboard });
  } catch (e) {
    console.log(e);

    res.status(404).json(e);
  }
});

router.get("/users/all", validateToken, async (req, res) => {
  const { id } = req.user;
  console.log("re");
  try {
    const scoreboards = await ScoreboardUser.findAll({
      where: { UserId: id },
      attributes: ["ScoreboardId"],
    });
    res.status(200).json(scoreboards);
  } catch (e) {
    console.log(e);

    res.status(404).json(e);
  }
});

router.get("/popular/:id", validateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const scoreboards = await Scoreboard.findAll({
      where: { id },
      include: [{ model: PopularGuesses }],
    });
    res.status(200).json(scoreboards);
  } catch (e) {
    console.log(e);

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
