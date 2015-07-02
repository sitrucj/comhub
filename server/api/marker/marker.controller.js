'use strict';

var _ = require('lodash');
var Marker = require('./marker.model');

// Get list of markers
exports.index = function(req, res) {
  Marker.find(function (err, markers) {
    if(err) { return handleError(res, err); }
    return res.json(200, markers);
  });
};

// Get a single marker
exports.show = function(req, res) {
  Marker.findById(req.params.id, function (err, marker) {
    if(err) { return handleError(res, err); }
    if(!marker) { return res.send(404); }
    return res.json(marker);
  });
};

// Creates a new marker in the DB.
exports.create = function(req, res) {
  Marker.create(req.body, function(err, marker) {
    if(err) { return handleError(res, err); }
    return res.json(201, marker);
  });
};

// Updates an existing marker in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Marker.findById(req.params.id, function (err, marker) {
    if (err) { return handleError(res, err); }
    if(!marker) { return res.send(404); }
    var updated = _.merge(marker, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, marker);
    });
  });
};

// Deletes a marker from the DB.
exports.destroy = function(req, res) {
  Marker.findById(req.params.id, function (err, marker) {
    if(err) { return handleError(res, err); }
    if(!marker) { return res.send(404); }
    marker.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}