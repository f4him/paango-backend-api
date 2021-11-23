const mongoose = require('mongoose');


var bookingSchema = new mongoose.Schema({
    from: Date,
    to: Date,
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rooms'
    }

})
module.exports = mongoose.model('bookings',bookingSchema)
