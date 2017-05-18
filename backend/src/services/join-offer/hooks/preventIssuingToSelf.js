const BadRequest = require('feathers-errors').BadRequest;

module.exports = () => {
  return (hook) => {
    if (hook.data.userId === hook.params.user.id) {
      throw new BadRequest('You cannot send the join offer to yourself.');
    }
  };
}
