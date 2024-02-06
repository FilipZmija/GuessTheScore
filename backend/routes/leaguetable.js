const express = require("express");
const router = express.Router();
const { Competition, TableLogs, Tables, Teams } = require("../models");
const { validateToken } = require("../auth/JWT");
const Sequelize = require("sequelize");
router.use(express.json({ limit: "10mb" }));
router.use((req, res, next) => {
  next();
});

router.get("/:ApiId", validateToken, async (req, res) => {
  const { ApiId } = req.params;
  const [homeId, awayId] = req.query.TeamsId;
  const competitionTable = await Competition.findOne({
    where: {
      ApiId,
    },
  });
  const tables = await competitionTable.getTables({
    include: [
      {
        model: TableLogs,
        include: [
          {
            model: Teams,
          },
        ],
      },
    ],

    order: [
      [TableLogs, "position", "ASC"],
      ["group", "ASC"],
    ],
  });
  const currentTables = tables.filter(
    (table) =>
      table.TableLogs.findIndex(
        (log) =>
          log.TeamApiId === Number(homeId) || log.TeamApiId === Number(awayId)
      ) !== -1
  );
  res.status(200).json({
    competitionTable: { ...competitionTable.dataValues, Tables: currentTables },
  });
});

router.get("/competition/all", validateToken, async (req, res) => {
  try {
    const competitions = await Competition.findAll({
      attributes: ["ApiId", "name"],
    });

    res.status(200).json({ competitions });
  } catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
});
module.exports = router;
