'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PointSchema = new Schema({
	coordinates: { lng: Number, lat: Number } 
});

module.exports = mongoose.model('Point', PointSchema);