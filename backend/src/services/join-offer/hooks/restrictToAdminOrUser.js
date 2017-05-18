const BadRequest = require('feathers-errors').BadRequest;
const globalHooks = require('../../../hooks');

module.exports = () => {
  return (hook) => {
    if (!hook.params.provider)
      return hook;

    const forbidden = 'Forbidden to access join offers of someone else.';
    const user = hook.params.user;
    if (hook.type === 'before') {
      if (hook.id == null) {
        const query = hook.params.query;
        if (query.userId == null && query.chatId == null) {
          query.userId = user.id;
        } else if (query.userId !== user.id) {
          if(query.chatId != null) {
            return globalHooks.restrictToChatAdmin(hook);
          } else {
            throw new BadRequest(forbidden);
          }
        }
      } else {
        return hook.service.get(hook.id).then((res) => {
          if (res.userId !== user.id) {
            if(globalHooks.isJoined(hook, userId, res.chatId, 'admin'))
              return hook;
            else
              throw new BadRequest(forbidden);
          }
        });
      }
    } else if (hook.result.userId !== user.id) {
      return globalHooks.restrictToChatAdmin(hook);
    }
  };
}
