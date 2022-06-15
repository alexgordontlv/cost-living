const Category = require('./category.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var costLiving = new Schema({
	name: { type: String, required: true, max: 100 },
	price: { type: Number, required: true },
	date: {type: Date,required:true},
	category: {
		type: String,
		enum: ['Home', 'Transportation','Entertainment','Food','Health','Sport','Private','Education'],
		required: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true,
		required: true
	}
});

// Export the model
module.exports = mongoose.model('CostLiving', costLiving);
