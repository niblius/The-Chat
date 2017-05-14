const BadRequest = require('feathers-errors').BadRequest;

module.exports = () => {
  return (hook) => {
    if (hook.params.query.chatId == null)
      throw new BadRequest('To remove join offer request should have chatId.');
    if (hook.params.query.userId == null)
        throw new BadRequest('To remove joind offer request should have userId.');
  };
}
