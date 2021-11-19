const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomid: String,
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hotel_managers'
    },
    type: String
});

const room = mongoose.model('Room', roomSchema);

module.exports = room;