const Category = require('./category.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var annualCosts = new Schema({
    sum: { type: Number, required: true },
    year:{type: Number, required: true},
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    }
});

// Export the model
module.exports = mongoose.model('annualCosts', annualCosts);
