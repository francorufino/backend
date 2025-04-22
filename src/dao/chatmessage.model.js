const mongoose = require("mongoose");
const messagesCollection = "chatmessages";

const chatMessageSchema = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model(messagesCollection, chatMessageSchema);
