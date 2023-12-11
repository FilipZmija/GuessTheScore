const express = require("express");
const router = express.Router();
const { Event, Guess } = require("../models");

router.use(express.json({ limit: "10mb" }));
router.use((req, res, next) => {
  next();
});

router.get("/info/:EventId", async (req, res) => {
  const { EventId } = req.params;
  try {
    const event = await Event.findAll({ where: { id: EventId } });
    res.status(200).json({ event });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("/guesses/:EventId", async (req, res) => {
  const { EventId } = req.params;
  try {
    const event = await Event.findOne({ where: { id: EventId } });
    const guesses = await Guess.findAll({ where: { EventId } });
    res.status(200).json({ event: { ...event.dataValues, guesses } });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/create", async (req, res) => {
  const { uri, teams, league, country, date, score } = req.body;
  try {
    const event = await Event.create({
      uri,
      teams,
      league,
      country,
      date,
      score,
    });
    res.status(200).json({ event });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

module.exports = router;
