const express = require("express");
const router = express.Router();
const { Competition, TableLogs, Tables, Teams } = require("../models");
const { validateToken } = require("../auth/JWT");

router.use(express.json({ limit: "10mb" }));
router.use((req, res, next) => {
  next();
});

router.get("/:ApiId", validateToken, async (req, res) => {
  const { ApiId } = req.params;
  const competitionTable = await Competition.findOne({
    where: { ApiId },
    include: [
      {
        model: Tables,
        include: [
          {
            model: TableLogs,
            order: [[TableLogs, "position", "ASC"]],
            include: [
              {
                model: Teams,
              },
            ],
          },
        ],
      },
    ],
  });
  res.status(200).json({ competitionTable });
});
module.exports = router;
