const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
const user = require("./routes/login");
require("dotenv").config();
const cookieParser = require("cookie-parser");

app.use("/user", user);
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(cookieParser());

const PORT = 3001;

(async () => {
  try {
    await db.sequelize.sync();
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error);
  }
})();
