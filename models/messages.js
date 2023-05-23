const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  date: Date,
  session: { type: mongoose.Schema.Types.ObjectId, ref: "sessions" },
});

const Message = mongoose.model("messages", messageSchema);

module.exports = Message;
