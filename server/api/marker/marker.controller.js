/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /markers              ->  index
 * POST    /markers              ->  create
 * GET     /markers/:id          ->  show
 * PUT     /markers/:id          ->  update
 * DELETE  /markers/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Marker = require('./marker.model');

//Get list of markers
exports.index = function(req, res) {
	Marker.find(function (err, markers) {
		if(err) { return handleError(res, err); }
		return res.json(200, markers);
	});
};

//get a single thing
exports.show = function (req, res) {
	Marker.FindById(req.params.id, function (err, thing) {
		if (err) { return handleError(req, err); }
		if (!thing) { return res.send(404); }
		return res.json(thing);
	});
};

// create a new marker
exports.create = function (req, res) {
	Marker.create(req.body, function  (err, marker) {
		if (err) { return handleError (res, err); }
		return res.json(201, thing);
	});
};

// updates and marker thing in the db
exports.update = function (req, res) {
	if (req.body._id) { delete req.body._id; };
	Marker.FindById(req.params.id, function (err, thing) {
		if (err) { return handleError(res, err); };
		if (!thing) { return res.send(404); };
		var updated = _.merge(thing, req.body);
		update.save(function (err) {
			if (err) { return	handleError(res, err); };
			return res.json(200, thing);
		});
	});
};

// Delete an marker
exports.destroy = function (req, res) {
	Thing.findById(req,params.id, function (err, thing) {
		if (err) {return handleError(res, err)};
		if (!thing) { return res.send(404); };
		thing.remove(function (err) {
			if (err) { return handleError(res, err); };
			return res.send(204);
		});
	});
};

function handError (res, err) {
	return res.send(500, err);
}