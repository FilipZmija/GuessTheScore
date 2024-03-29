const express = require("express");
const router = express.Router();
const { Event, Guess, Teams, EventTeams } = require("../models");
const { validateToken } = require("../auth/JWT");
router.use(express.json({ limit: "10mb" }));
router.use((req, res, next) => {
  next();
});

router.get("/all", validateToken, async (req, res) => {
  const filterBy = req.query.filterBy?.split(",");
  const { date } = req.query;
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
                await Event.findAll(
                  {
                    order: [["utcDate", "ASC"]],
                    where: { status: filter[item], date: date },
                    include: [
                      {
                        model: Teams,
                        through: { model: EventTeams },
                      },
                    ],
                  },
                  {}
                )
            )
          )
        : await Event.findAll({
            order: [["utcDate", "ASC"]],

            where: { date: date },
            include: [
              {
                model: Teams,
                through: { model: EventTeams },
              },
            ],
          });
    } else {
      event = filterBy
        ? await Promise.all(
            filterBy.map(
              async (item) =>
                await Event.findAll({
                  order: [["utcDate", "ASC"]],

                  where: { status: filter[item] },
                  include: [
                    {
                      model: Teams,
                      through: { model: EventTeams },
                    },
                  ],
                })
            )
          )
        : await Event.findAll({
            order: [["utcDate", "ASC"]],
            include: [
              {
                model: Teams,
                through: { model: EventTeams },
              },
            ],
          });
    }
    event.Teams = event.map((item) =>
      item.Teams.sort((a, b) => {
        return b.EventTeams.homeOrAway.localeCompare(a.EventTeams.homeOrAway);
      })
    );

    res.status(200).json(event);
  } catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
});

router.get("/info/:EventId", validateToken, async (req, res) => {
  const { EventId } = req.params;
  try {
    const event = await Event.findAll({
      where: { id: EventId },
      include: [
        {
          model: Teams,
          through: { model: EventTeams },
        },
      ],
    });
    res.status(200).json({ event });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("/guesses/:EventId", validateToken, async (req, res) => {
  const { EventId } = req.params;
  const { id } = req.user;
  try {
    const event = await Event.findOne({
      where: { id: EventId },
      include: [
        {
          model: Guess,
          where: { UserId: id },
          required: false,
        },
        {
          model: Teams,
        },
      ],
    });
    event.Teams = event.Teams.sort((a, b) => {
      return b.EventTeams.homeOrAway.localeCompare(a.EventTeams.homeOrAway);
    });

    res.status(200).json({ event });
  } catch (e) {
    res.status(400).json(e);
    console.error(e);
  }
});

router.get("/guess/user/:EventId", validateToken, async (req, res) => {
  const { EventId } = req.params;
  const { id } = req.user;
  try {
    const event = await Event.findOne({
      where: { id: EventId },
      include: [
        {
          model: Guess,
          where: { UserId: id },
        },
      ],
    });
    res.status(200).json({ event });
  } catch (e) {
    res.status(400).json(e);
    console.error(e);
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
    console.error(e);
    res.status(400).json(e);
  }
});

router.get("/dates", validateToken, async (req, res) => {
  try {
    const { date: firstDate } = await Event.findOne({
      order: [["date", "ASC"]],
      attributes: ["date"],
    });

    const { date: lastDate } = await Event.findOne({
      order: [["date", "DESC"]],
      attributes: ["date"],
    });
    res.status(200).json({ firstDate, lastDate });
  } catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
});
module.exports = router;
