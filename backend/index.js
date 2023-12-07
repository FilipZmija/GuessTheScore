const express = require("express");
const app = express();
const sqlite = require("sqlite3").verbose();
const cors = require("cors");
const db = require("./models");
const { Users } = require("./models");
const bcrypt = require("bcrypt");

app.use(express.json({ limit: "10mb" }));
app.use(cors());

//register user
app.post("/registerUser", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const newUser = await Users.create({ username, password: hash });
    res.send({ newUser });
  } catch (e) {
    res.status(400).json({ message: e.errors.map((item) => item.message) });
  }
});

//login user
app.post("/loginUser", (req, res) => {
  const { username, password } = req.body;
});

//get user data
app.get("/getUser", (req, res) => {
  const { id } = req.query;
});

//Get all users
app.get("/getUsers", (req, res) => {});

//Delete existing user
app.delete("/deleteUser/", (req, res) => {
  const { id } = req.query;
});

const PORT = 3001;

(async () => {
  try {
    await db.sequelize.sync();
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error);
  }
})();
