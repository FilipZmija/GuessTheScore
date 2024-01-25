const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { createTokens, validateToken } = require("../auth/JWT");

router.use(express.json({ limit: "10mb" }));
router.use((req, res, next) => {
  next();
});

//register user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (username.length > 12 || username.length < 4 || password.length < 4)
    return res
      .status(400)
      .json({ message: "Username or password with invalid length" });

  const hash = await bcrypt.hash(password, 10);

  try {
    const newUser = await Users.create({ username, password: hash });
    res.json({ newUser });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

//login user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });
  if (!user) return res.status(404).json({ message: "User does not exists" });

  const dbPassword = await bcrypt.compare(password, user.password);
  if (!dbPassword) return res.status(400).json({ message: "Invalid password" });

  const accessToken = createTokens(user);

  res.json({ message: "User logged in", accessToken: accessToken });
});

//Delete existing user
router.delete("/delete", validateToken, async (req, res) => {
  const { id } = req.user;
  try {
    const users = await Users.findOne({ where: { id: id } });
    if (!users) return res.status(404).send({ message: "User not found" });

    await Users.destroy({ where: { id: id } });

    res.status(200).json({ message: `User deleted succesfully` });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

//get user data
router.get("/profile", validateToken, async (req, res) => {
  const id = req.query.id || req.user.id;

  const users = await Users.findAll({ where: { id: id } });
  res.status(200).send({ users });
});

//Get all users
router.get("/users", async (req, res) => {
  const users = await Users.findAll();
  res.status(200).send({ users });
});

module.exports = router;
