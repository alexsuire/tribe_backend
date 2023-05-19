var express = require("express");
var router = express.Router();

require("../models/connection");
const Session = require("../models/sessions");

router.post("/", (req, res) => {
  //Création d'une session
  const newSession = new Session({
    name: req.body.name,
    admin: req.body.admin,
    users: req.body.users,
    spot: req.body.spot,
    date_start: req.body.date_start,
    date_end: req.body.date_end,
    description: req.body.description,
  });

  newSession.save().then((newDoc) => {
    res.json({ result: true, id: newDoc._id });
  });
});

// Route pour récupérer une session via son id
router.get("/oneSession/:_id", (req, res) =>
  Session.findOne({ _id: req.params._id })
    .populate("spot")
    .populate("admin")
    .populate("users")
    .then((data) => {
      res.json({ data });
    })
);

module.exports = router;
