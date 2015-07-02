'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var markerSchema = new mongoose.Schema({
	title: String,
	text: String,
	username: { type: Schema.ObjectId, ref: 'User' },
	lat: {type: Number, default: 0},
	lon: {type: Number, default: 0},
	created_at: {type: Date, default: Date.now}
}) 

mongoose.model('Marker', markerSchema);