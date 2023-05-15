var express = require("express");
const Nationality = require("../models/nationalities");
var router = express.Router();

router.get("/allCountries", (req, res) =>
  Nationality.find().then((allCountries) => {
    res.json(allCountries);
  })
);

router.get("/oneCountry/:country", (req, res) =>
  Nationality.findOne({ country: req.params.country }).then((data) => {
    res.json({ data });
  })
);
module.exports = router;
