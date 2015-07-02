'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MarkerSchema = new Schema({
	title: String,
	text: String,
	loc: {
		type: Schema.ObjectId,
		ref: 'Point'
	},
	Creator:
	{
  	type: Schema.ObjectId,
  	ref: 'User'
  },
	created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Marker', MarkerSchema);