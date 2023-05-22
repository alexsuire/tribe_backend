const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  date: Date,
});

const Message = mongoose.model("messages", messageSchema);

module.exports = Message;
