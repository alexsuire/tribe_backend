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

// Ajout d'un user dans une session
router.post("/addUser/:sessionId/:userId", (req, res) => {
  const sessionId = req.params.sessionId;
  const userId = req.params.userId;

  Session.findOne({ _id: sessionId })
    .then((session) => {
      if (!session) {
        return res.json({ error: "Session not found" });
      }

      // Vérifier si l'utilisateur existe déjà dans la session
      if (session.users.includes(userId)) {
        return res.json({ error: "User already exists in the session" });
      }

      // Ajouter l'utilisateur à la liste des utilisateurs de la session
      session.users.push(userId);

      // Enregistrer les modifications de la session
      session.save().then(() => {
        res.json({
          result: true,
          message: "User added to session successfully",
        });
      });
    })
    .catch((error) => {
      res.json({ error: "Internal server error" });
    });
});

module.exports = router;
