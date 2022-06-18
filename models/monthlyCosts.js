var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var monthlyCosts = new Schema({
	sum: { type: Number, required: true },
	date: { type: Date, required: true },
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true,
		required: true,
	},
});

// Export the model
module.exports = mongoose.model('monthlyCosts', monthlyCosts);
