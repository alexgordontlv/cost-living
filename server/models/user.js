// Require mongoose
const mongoose = require('mongoose');
const CostLiving = require('./costLiving').schema;
// Define Schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
	first_name: {
		required: true,
		type: String,
	},
	last_name: {
		required: true,
		type: String,
	},
	birthday: {
		required: true,
		type: Date,
	},
	email: {
		type: String,
	},
	marital_status: {
		type: String,
		enum: ['Single', 'Married', 'Widowed', 'Divorced'],
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	cost_livings: {
		total_sum: { type: Number },
		records: [{ type: CostLiving }],
	},
});

// Create and export a model
module.exports = mongoose.model('User', userSchema);
