const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const messagesCollection = "messages";

const messagesSchema = new mongoose.Schema({
  dateTime: now(),
  user: {
    type: ObjectId,
  },
  message: {
    type: String,
    default: null,
  },
});

const messagesModel = mongoose.model(messagesCollection, messagesSchema);
module.exports = messagesModel;
