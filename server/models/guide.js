const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const guide_schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    base_price: {
        type: Number,
        required: true
    },
    site_list: {
        type: String,
        required: true
    }
})

guide_schema.pre('save', function (next) {
    const user = this

    bcrypt.hash(user.password, 10, function (error, encrypted) {
        user.password = encrypted
        next()
    })
})



module.exports = mongoose.model('guides', guide_schema)
