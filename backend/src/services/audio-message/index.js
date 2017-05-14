const blobService = require('feathers-blob');
const fs = require('fs-blob-store');
const blobStorage = fs(__dirname + '/uploads');
const hooks = require('./hooks');

module.exports = function() {
  // TODO multipart support

  const app = this;
  app.use('/audio-messages', blobService({Model: blobStorage}));
  const audioMessages = app.service('/audio-messages');
  delete audioMessages.find;
  delete audioMessages.update;
  delete audioMessages.patch;
  delete audioMessages.remove
  audioMessages.before(hooks.before);
  audioMessages.after(hooks.after);
};
