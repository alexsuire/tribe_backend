var express = require("express");
var router = express.Router();
const Spot = require("../models/spots");
require("../models/connection");

// Route pour récupérer tous les spots en base de donnée
router.get("/", (req, res) => {
  Spot.find({})
  .populate("sessions")
  .then((data) => {
    res.json({ data });
  });
});



// Route pour récupérer les infos d'un spot précis
router.get("/oneSpot/:id", (req, res) => {
  Spot.findOne({_id: req.params.id})
  .populate({
    path: "sessions",
    populate: {
      path: "spot",
    },
  })  .then((data) => {
    res.json({ data });
  });
});


// Route pour ajouter une session à un spot
router.put("/:id", async (req, res) => {
  try {

    // Recherche du spot dans la base de données
    const spot = await Spot.findOneAndUpdate(
      {_id: req.params.id}, // Critère de recherche (IDdu spot)
      { $push: { sessions: req.body.session } }, // Données à mettre à jour
      { new: true } // Retourner la version mise à jour du spot
    );

    if (!spot) {
      return res.status(404).json({ message: "Spot non trouvé" });
    }

    return res.status(200).json(spot);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue" });
  }
});

router.post("/bySpotName", (req, res) => {
  Spot.findOne({name: req.body.spotName})
  .then((data) => {
    res.json({ data });
  });
});


module.exports = router;
