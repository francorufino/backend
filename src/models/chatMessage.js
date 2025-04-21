const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
  nome: String,
  mensagem: String,
  data: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
