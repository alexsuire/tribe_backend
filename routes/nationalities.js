var express = require("express");
const Nationality = require("../models/nationalities");
var router = express.Router();

// Route pour récupérer tous les pays en base de donnée
router.get("/allCountries", (req, res) =>
  Nationality.find().then((data) => {
    res.json({ data });
  })
);

// Route pour récupérer un pays via son nom
router.get("/oneCountry/:country", (req, res) =>
  Nationality.findOne({ country: req.params.country }).then((data) => {
    res.json({ data });
  })
);
module.exports = router;
