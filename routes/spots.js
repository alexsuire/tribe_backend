var express = require("express");
var router = express.Router();
const Spot = require("../models/spots");
require("../models/connection");

router.get("/", (req, res) => {
  Spot.find({}).then((data) => {
    res.json({ data });
  });
});

module.exports = router;
