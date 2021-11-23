const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleid: String,
    type: String,
    cost: Number,
    capacity: Number,
    facilities: [String],
    rental: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rental_managers'
    }

});

module.exports = mongoose.model('vehicles', vehicleSchema);
