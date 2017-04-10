const BadRequest = require('feathers-errors').BadRequest;

function onlyRole() {
  return (hook) => {
    if (!hook.data.role)
      throw new BadRequest('The role should be set.');

    if (hook.data.userId)
      throw new BadRequest('Cannot change userId');

    if (hook.data.chatId)
      throw new BadRequest('Cannot change chatId');

    return hook;
  };
}

module.exports = onlyRole;
