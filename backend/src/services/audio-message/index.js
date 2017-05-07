'use strict';

const blobService = require('feathers-blob');
const fs = require('fs-blob-store');
const blobStorage = fs(__dirname + '/uploads');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;
  app.use('/audio-messages', blobService({Model: blobStorage}));
  const audioMessage = app.service('/audio-messages');
  audioMessage.before(hooks.before);
  audioMessage.after(hooks.after);
};
