const Category = require('./category.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var annualCosts = new Schema({
    sum: { type: Number, required: true },
    date: {type: Date,required:true},
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    }
});

// Export the model
module.exports = mongoose.model('annualCosts', annualCosts);
