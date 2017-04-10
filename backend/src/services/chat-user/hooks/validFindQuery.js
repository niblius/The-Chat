const globalHooks = require('../../../hooks');

function validFindQuery() {
  return (hook) => {
    if(!hook.params.provider)
      return hook;

    if (!hook.params.query.chatId) {
      hook.params.query.userId = hook.params.user.id;
      return hook;
    }

    return globalHooks.restrictToJoinedThrows()(hook);
  };
}

module.exports = validFindQuery;
