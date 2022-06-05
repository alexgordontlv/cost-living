var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const categorySchema = new Schema({
	name: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Category', categorySchema);
