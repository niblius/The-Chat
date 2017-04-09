const BadRequest = require('feathers-errors').BadRequest;

function validPatchQuery() {
  return (hook) => {
    if (!hook.params.query.UserId || !hook.params.query.ChatId)
      throw new BadRequest('UserId and ChatId should be set.');
    
    return hook;
  }
};

module.exports = validPatchQuery;
