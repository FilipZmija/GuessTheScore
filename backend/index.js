const express = require("express");
const app = express();
const sqlite = require("sqlite3").verbose();
const cors = require("cors");
const db = new sqlite.Database(
  "./db/guesser.db",
  sqlite.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err);
  }
);

app.use(express.json({ limit: "10mb" }));
app.use(cors());

//Initialize table
const sqlInit = `CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
  )`;

db.all(sqlInit, [], (err) => {
  if (err) return console.error(err);
});

//Get all users
app.get("/getUsers", (req, res, err) => {
  db.all("SELECT * FROM users", function (err, rows) {
    if (err) return console.error(err);
    else {
      res.json({
        status: 200,
        data: rows,
      });
    }
  });
});

//Create new user
app.post("/createUser", (req, res, err) => {
  const { username, email, password } = req.body;
  db.run(
    "INSERT INTO users (username, email, password) VALUES (?,?,?)",
    [username, email, password],
    function (err) {
      if (err) return console.error(err);
      else {
        res.json({
          status: 201,
          message: "New user created successfully",
          data: { id: this.lastID, ...req.body },
        });
      }
    }
  );
});

//login user
app.post("/loginUser", (req, res, err) => {
  const { username, password } = req.body;
  db.get(
    "SELECT * FROM users WHERE username =? AND password =?",
    [username, password],
    function (err, row) {
      if (err) return console.error(err);
      else {
        console.log(row);
        res.json({
          status: 200,
          message: "User logged in successfully",
          data: row,
        });
      }
    }
  );
});

//Delete existing user
app.delete("/deleteUser/", (req, res, err) => {
  const { id } = req.query;
  db.run("DELETE FROM users WHERE id =?", [id], function (err) {
    if (err) return console.error(err);
    else {
      this.changes === 1
        ? res.json({
            status: 201,
            message: "User deleted successfully",
          })
        : res.json({ status: 403, message: "No user with this ID" });
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
