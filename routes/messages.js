var express = require("express");
var router = express.Router();
const Message = require("../models/messages");
const { checkBody } = require("../modules/checkBody");

// ajout d'un message
router.post("/add", (req, res) => {
  const newMessage = new Message({
    user: req.body.userId,
    text: req.body.text,
    date: Date.now(),
    session: req.body.sessionId,
  });
  newMessage
    .save()
    .then((data) => {
      res.json({
        result: true,
      });
    })
    .catch((error) => {
      console.error(error);
      res.json({
        result: false,
        error: "Unable to save data",
      });
    });
});

// recup tous les messages
router.get("/getAll", (req, res) => {
  Message.find()
    .populate("user")
    .then((data) => {
      res.json({ result: true, messages: data });
    });
});

router.get("/getAllMessages/:sessionId", (req, res) => {
  const sessionId = req.params.sessionId;

  Message.find({ session: sessionId })
    .then((data) => {
      res.json({ result: true, messages: data });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
