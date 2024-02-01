const express = require("express");
const router = express.Router();
const {
  Event,
  Guess,
  Score,
  ScoreboardCompetiton,
  Competition,
  Scoreboard,
  Users,
} = require("../models");
const Sequelize = require("sequelize");
const { validateToken } = require("../auth/JWT");

router.use(express.json({ limit: "10mb" }));
router.use((req, res, next) => {
  next();
});

router.get("/info/", validateToken, async (req, res) => {
  const { EventId } = req.query;
  const { id } = req.user;
  try {
    const guess = await Guess.findOne({ where: { UserId: id, EventId } });
    const allGuesses = await Guess.findAll({ where: { EventId } });

    res.status(200).json({ userGuess: guess, allGuesses: allGuesses });
  } catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
});

//add and create could possibly be one guess
router.post("/add", validateToken, async (req, res) => {
  const { score, EventId } = req.body;
  const { id } = req.user;
  const event = await Event.findOne({ where: { id: EventId } });
  if (event.status !== "FINISHED") {
    try {
      const guess = await Guess.create(
        {
          score,
          UserId: id,
          EventId,
        },
        {
          individualHooks: true,
        }
      );
      res.status(200).json({ guess });
    } catch (e) {
      console.error(e);
      res.status(400).json(e);
    }
  } else res.status(400).json({ message: "Event is finished" });
});

router.put("/edit/:GuessId", validateToken, async (req, res) => {
  const { GuessId } = req.params;
  const { score, EventId } = req.body;
  const { id } = req.user;

  try {
    const guess = await Guess.findOne({
      where: { EventId, UserId: id, id: GuessId },
      include: [{ model: Event }],
    });
    if (!guess) {
      return res.status(404).json({ message: "No such a guess" });
    }
    if (guess.dataValues.Event.dataValues.status !== "FINISHED") {
      await guess.update({ score });
      res.status(200).json({ guess });
    } else {
      res.status(400).json({ message: "Game has already started or ended" });
    }
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
