const express = require("express");
const router = express.Router();
const { Event, Users, Guess } = require("../models");

router.use(express.json({ limit: "10mb" }));
router.use((req, res, next) => {
  next();
});

router.get("/info/:GuessId", async (req, res) => {
  const { GuessId } = req.params;
  try {
    const guess = await Guess.findOne({ where: { id: GuessId } });

    if (guess) {
      const event = await Users.findOne({ where: { id: guess.UserId } });
      const user = await Event.findOne({ where: { id: guess.EventId } });
      res.status(200).json({ guess: { ...guess.dataValues, event, user } });
    } else {
      res.status(404).json(guess);
    }
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

router.post("/add", async (req, res) => {
  const { score, UserId, EventId } = req.body;
  try {
    const guess = await Guess.create({ score, UserId, EventId });
    res.status(200).json({ guess });
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
