const express = require("express");
const router = express.Router();
const { Event, Guess } = require("../models");
const { validateToken } = require("../auth/JWT");
router.use(express.json({ limit: "10mb" }));
router.use((req, res, next) => {
  next();
});

router.get("/all", async (req, res) => {
  const filterBy = req.query.filterBy?.split(",");
  const { date } = req.query;
  console.log(req.query.date);
  const filter = {
    past: "FINISHED",
    current: "IN_PLAY",
    upcoming: "TIMED",
  };

  try {
    let event;
    if (date) {
      event = filterBy
        ? await Promise.all(
            filterBy.map(
              async (item) =>
                await Event.findAll({
                  where: { status: filter[item], date: date },
                })
            )
          )
        : await Event.findAll({ where: { date: date } });
    } else {
      event = filterBy
        ? await Promise.all(
            filterBy.map(
              async (item) =>
                await Event.findAll({ where: { status: filter[item] } })
            )
          )
        : await Event.findAll();
    }
    res.status(200).json(event.sort((a, b) => a.utcDate - b.utcDate));
  } catch (e) {
    res.status(400).json(e);
  }
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

router.get("/guesses/:EventId", validateToken, async (req, res) => {
  const { EventId } = req.params;
  try {
    const event = await Event.findOne({ where: { id: EventId } });
    const guesses = await Guess.findAll({ where: { EventId } });
    res.status(200).json({ event: { ...event.dataValues, guesses } });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/create", validateToken, async (req, res) => {
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
