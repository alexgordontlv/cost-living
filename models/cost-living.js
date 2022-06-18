const Category = require('./category.js').schema;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var costLiving = new Schema({
	name: { type: String, required: true, max: 100 },
	price: { type: Number, required: true },
	date: { type: Date, required: true },
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true,
		required: true,
	},
});

// Export the model
module.exports = mongoose.model('CostLiving', costLiving);
