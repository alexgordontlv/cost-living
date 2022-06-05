const Category = require('./category');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var costLiving = new Schema({
	name: { type: String, required: true, max: 100 },
	sum: { type: Number, required: true },
	Category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
});

// Export the model
module.exports = mongoose.model('CostLiving', costLiving);
