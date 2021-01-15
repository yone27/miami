const mongoose = require("mongoose");
const Schema = mongoose.Schema;
	   
// Create Schema
const pageSchema = new Schema({
	page: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	userId: {
		type: Schema.ObjectId,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Page = mongoose.model("pages", pageSchema);
