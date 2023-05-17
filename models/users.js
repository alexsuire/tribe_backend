const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: String, 
    lastname: String,
    age: Number,
    email: String,
    level: String,
    password: String,
    token: String,
    nationalities: { type: mongoose.Schema.Types.ObjectId, ref: 'nationalities' },
    spots: { type: mongoose.Schema.Types.ObjectId, ref: 'spots' },

  });
  
  const User = mongoose.model('users', userSchema);
  
  module.exports = User;


