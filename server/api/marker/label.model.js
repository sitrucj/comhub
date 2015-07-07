'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LabelSchema = new Schema({
	"message": String,
  "show": true,
  "showOnMouseOver": true
});

module.exports = mongoose.model('Label', LabelSchema);




