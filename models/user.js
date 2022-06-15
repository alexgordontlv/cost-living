// Require mongoose
const mongoose = require('mongoose')

// Define Schema
const Schema = mongoose.Schema
const userSchema = new Schema({
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        required: true,
        type: String
    },
    birthday: {
        required: true,
        type: Date
    },
    email: {
        type: String
    },
    marital_status: {
        type: String,
        enum: ['single', 'married','widowed','divorced'],
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// Create and export a model
module.exports = mongoose.model('User', userSchema)