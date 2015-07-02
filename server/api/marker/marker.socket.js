/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Marker = require('./marker.model');

exports.register = function(socket) {
  Marker.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Marker.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('marker:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('marker:remove', doc);
}