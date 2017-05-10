const BadRequest = require('feathers-errors').BadRequest;

function onlyServerCallsSetBlobId() {
  return (hook) => {
    if (hook.data.blobId && hook.params.provider) {
      throw new BadRequest('Please use audio-messages service to create audio messages.');
    }
  };
}

module.exports = onlyServerCallsSetBlobId;
