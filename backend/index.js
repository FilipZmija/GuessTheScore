const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
const user = require("./routes/login");
const events = require("./routes/events");
const guess = require("./routes/guess");
const scoreboards = require("./routes/scoreboards");
const leaguetable = require("./routes/leaguetable");

const { initTable, getHundredGames } = require("./init/functions");

const {
  getTeamsAndTables,
  createOrUpdateEvent,
  getEvents,
} = require("./outsource/calls");

require("dotenv").config();
const cookieParser = require("cookie-parser");
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors());
// const match = {
//   competition: "TEST Primera Division",
//   apiId: 13,
//   utcDate: "2024-01-06T16:00:00.000Z",
//   date: "2024-01-23",
//   utcTime: "16:00:00",
//   status: "IN_PLAY",
//   homeTeam: "TEST_Osasuna",
//   homeTeamCrest: "https://crests.football-data.org/79.svg",
//   awayTeam: "TEST_Almería",
//   awayTeamCrest: "https://crests.football-data.org/267.png",
//   score: "1:1",
// };
//createOrUpdateEvent(match);
// setInterval(() => createOrUpdateEvent(match), 1000 * 10);
//TEST

app.use("/user", user);
app.use("/event", events);
app.use("/guess", guess);
app.use("/scoreboards", scoreboards);
app.use("/leaguetable", leaguetable);

//init D data
// getHundredGames();
getTeamsAndTables();
initTable();

setInterval(() => getEvents(), 1000 * 60);
setInterval(() => getTeamsAndTables(), 5000 * 60);

const PORT = 3001;
(async () => {
  try {
    await db.sequelize.sync();
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error);
  }
})();
