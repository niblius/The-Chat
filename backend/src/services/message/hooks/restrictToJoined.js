const globalHooks = require('../../../hooks');

function restrictToJoined() {
  return (hook) => {
    if (!hook.params.provider)
      return hook;
    return globalHooks.restrictToJoined(hook,
      hook.params.user.id, hook.params.query.ChatId);
  };
}

module.exports = restrictToJoined;
