'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MarkerSchema = new Schema({
	title: String,
	text: String,
	username: { type: Schema.ObjectId, ref: 'User' },
	lat: {type: Number, default: 0},
	lon: {type: Number, default: 0},
	created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Marker', MarkerSchema);