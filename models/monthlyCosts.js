var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var monthlyCosts = new Schema({
	sum: { type: Number, required: true, default:0 },
	month:{type: Number, required: true, max: 12},
	year:{type: Number, required: true},
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true,
		required: true,
	},
});

// Export the model
module.exports = mongoose.model('monthlyCosts', monthlyCosts);
