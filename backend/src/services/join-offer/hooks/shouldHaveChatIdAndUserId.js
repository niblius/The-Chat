const BadRequest = require('feathers-errors').BadRequest;

module.exports = () => {
  return (hook) => {
    if (hook.params.query.chatId == null)
      throw new BadRequest('The request should have chatId to remove join offer.');
    if (hook.params.query.userId == null)
        throw new BadRequest('The request should have userId to remove join offer.');
  };
}
