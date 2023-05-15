const mongoose = require("mongoose");

const nationalitySchema = mongoose.Schema({
  country: String,
  image: String,
  imageurl: String,
});

const Nationality = mongoose.model("nationalities", nationalitySchema);

module.exports = Nationality;
