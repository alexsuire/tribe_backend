const mongoose = require('mongoose');

const spotschema = mongoose.Schema({
    name: String,
    region: String,
    type: String,
    rating: Number,
    latitude: Number,
    longitude: Number,
    reliability: String,
    sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'sessions' }],
    photo : String,
});

const Spot = mongoose.model('spots', spotschema);

module.exports = Spot;