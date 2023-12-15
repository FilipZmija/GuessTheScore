const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
const user = require("./routes/login");
const events = require("./routes/events");
const guess = require("./routes/guess");

const { getEvents } = require("./outsource/calls");
require("dotenv").config();
const cookieParser = require("cookie-parser");
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors());

app.use("/user", user);
app.use("/event", events);
app.use("/guess", guess);

setInterval(() => getEvents(), 1000 * 60);

const PORT = 3001;

(async () => {
  try {
    await db.sequelize.sync();
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error);
  }
})();
