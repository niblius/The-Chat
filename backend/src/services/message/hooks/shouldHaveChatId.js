const BadRequest = require('feathers-errors').BadRequest;

module.exports = () => {
  return (hook) => {
    if (hook.method.match('create')) {
      if (hook.data.chatId === null) {
        throw new BadRequest('chatId cannot be null or undefined');
      }
    } else {
      if (hook.params.query.chatId === null) {
        throw new BadRequest('chatId cannot be null or undefined');
      }
    }
    return hook;
  };
}
