'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MarkerSchema = new Schema({
	title: String,
	text: String,
	lat: Number,
	lon: Number,
	user: String,
	User: String,
	created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Marker', MarkerSchema);

