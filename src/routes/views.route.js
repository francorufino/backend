const express = require("express");
const router = express.Router();
const userService = require("../service/user.service");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/list", async (req, res) => {
  const users = await userService;
  res.render("list", { users });
});

module.exports = router;
