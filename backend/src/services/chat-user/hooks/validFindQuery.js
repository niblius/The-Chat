const Forbidden = require('feathers-errors').Forbidden;

const globalHooks = require('../../../hooks');

function validFindQuery() {
  return (hook) => {
    if(!hook.params.provider)
      return hook;

    if (!hook.params.query.ChatId) {
      hook.params.query.UserId = hook.params.user.id;
      return hook;
    }

    return globalHooks.restrictToJoined(hook, hook.params.user.id,
      hook.params.query.ChatId);
  };
}

module.exports = validFindQuery;
