const BadRequest = require('feathers-errors').BadRequest;

function onlyRole() {
  return (hook) => {
    if (!hook.data.role)
      throw new BadRequest('The role should be set.');

    if (hook.data.UserId)
      throw new BadRequest('Cannot change UserId');

    if (hook.data.ChatId)
      throw new BadRequest('Cannot change ChatId');

    return hook;
  };
}

module.exports = onlyRole;
