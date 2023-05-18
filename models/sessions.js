const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
  name: String,
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  spot: { type: mongoose.Schema.Types.ObjectId, ref: "spots" },
  date_start: Date,
  date_end: Date,
  description: String,
});

const Session = mongoose.model("sessions", sessionSchema);

module.exports = Session;
