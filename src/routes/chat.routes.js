const express = require("express");
const router = express.Router();
const chatMessage = require("../models/chatMessage");

router.get("/", async (req, res) => {
  const mensagens = await ChatMessage.find().sort({ data: -1 });
  res.render("chat", { mensagens });
});
router.post("/", async (req, res) => {
  const { nome, mensagem } = req.body;
  await ChatMessage.create({ nome, mensagem });
  res.status(200).json({ message: "Mensagem enviada com sucesso!" });
});

module.exports = router;
