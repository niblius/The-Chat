const BadRequest = require('feathers-errors').BadRequest;

function cannotSetRole() {
  return (hook) => {
    if (!hook.params.provider)
      return hook;

    if (hook.data.role)
      throw new BadRequest('The role cannot be set.');

    return hook;
  };
}

module.exports = cannotSetRole;
