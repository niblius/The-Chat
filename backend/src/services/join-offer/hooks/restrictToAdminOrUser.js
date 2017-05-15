const BadRequest = require('feathers-errors').BadRequest;
const globalHooks = require('../../../hooks');

module.exports = () => {
  return (hook) => {
    if (!hook.params.provider)
      return hook;

    const query = hook.params.query;
    const user = hook.params.user;
    if (query.userId == null && query.chatId == null) {
      query.userId = user.id;
    }
    else if (query.userId !== user.id) {
      if(query.chatId != null) {
        return globalHooks.restrictToChatAdmin(hook);
      } else {
        throw new BadRequest('Forbidden to access join offers of someone else.');
      }
    }
  };
}
