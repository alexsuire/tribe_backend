var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');



// routes signup user (inscription) 
router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['firstname', 'lastname', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({firstname: req.body.firstname, lastname: req.body.lastname}).then(data => {
    if (data === null) {

      const hash = bcrypt.hashSync(req.body.password, 10);

      //Création d'un nouveau user
      const newUser = new User({
        firstname: req.body.firstname, 
        lastname: req.body.lastname,
        age: req.body.age,
        email: req.body.email,  
        level: req.body.level,      
        password: hash,
        token: uid2(32),
        nationalities: req.body.nationalities,
        spots: req.body.spots,
      });

      newUser.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }

  });
});


// Route pour se connecter à l'application
router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ email: req.body.email }).then(data => {
    console.log("data", data); // Ajout du console.log pour afficher les données
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token, firstname: data.firstname, lastname: data.lastname, email: data.email, level: data.level});
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  }); 

});

module.exports = router;
