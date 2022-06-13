// Require mongoose
const mongoose = require('mongoose')

// Define Schema
const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
})

// Create and export a model
module.exports = mongoose.model('User', userSchema)