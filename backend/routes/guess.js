const express = require("express");
const router = express.Router();
const { Event, Users, Guess } = require("../models");
const { validateToken } = require("../auth/JWT");

router.use(express.json({ limit: "10mb" }));
router.use((req, res, next) => {
  next();
});

router.get("/info/", validateToken, async (req, res) => {
  const { GuessId, EventId } = req.query;
  if (GuessId) {
    try {
      const guess = await Guess.findOne({ where: { id: GuessId } });

      if (guess) {
        const user = await Users.findOne({ where: { id: guess.UserId } });
        const event = await Event.findOne({ where: { id: guess.EventId } });
        res.status(200).json({ guess: { ...guess.dataValues, event, user } });
      } else {
        res.status(404).json(guess);
      }
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  } else if (EventId) {
    try {
      const guesses = await Guess.findAll({ where: { EventId: EventId } });
      res.status(200).json({ guesses });
    } catch (e) {
      res.status(400).json(e);
    }
  }
});

//add and create could possibly be one guess
router.post("/add", validateToken, async (req, res) => {
  const { score, EventId } = req.body;
  const { id } = req.user;
  const event = await Event.findOne({ where: { id: EventId } });
  if (event.status !== "FINISHED") {
    try {
      const guess = await Guess.create({ score, UserId: id, EventId });
      res.status(200).json({ guess });
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  } else res.status(400).json({ message: "Event is finished" });
});

router.put("/edit", validateToken, async (req, res) => {
  const { score, EventId } = req.body;
  const { id } = req.user;
  console.log(id, EventId);
  try {
    const guess = await Guess.findOne({
      where: { EventId: EventId, UserId: id },
    });

    if (!guess) {
      return res.status(404).json({ message: "No such a guess" });
    }

    const event = await Event.findOne({ where: { id: EventId } });
    if (event.status === "TIMED") {
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
