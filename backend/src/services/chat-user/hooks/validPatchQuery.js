const BadRequest = require('feathers-errors').BadRequest;

function validPatchQuery() {
  return (hook) => {
    if (!hook.params.query.userId || !hook.params.query.chatId)
      throw new BadRequest('userId and chatId should be set.');
    
    return hook;
  }
};

module.exports = validPatchQuery;
