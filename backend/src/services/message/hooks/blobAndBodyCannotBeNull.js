const BadRequest = require('feathers-errors').BadRequest;

function blobAndBodyCannotBeNull() {
  return (hook) => {
    if (!hook.data.blobId && !hook.data.body) {
      throw new BadRequest('blobId and body cannot be null simultaniously.');
    }
  };
}

module.exports = blobAndBodyCannotBeNull;
