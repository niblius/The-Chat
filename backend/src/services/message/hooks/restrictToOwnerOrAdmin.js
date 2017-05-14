const globalHooks = require('../../../hooks');

function sameUserIdOrAdmin(hook, userId) {
  if (hook.params.user.id !== userId) {
    return globalHooks.restrictToChatAdmin()(hook);
  }
  return hook;
}

function restrictToOwnerOrAdmin() {
  return (hook) => {
    if (hook.id == null) {
      sameUserIdOrAdmin(hook, hook.params.query.userId);
    }

    const messages = hook.app.service('messages');
    return messages.get(hook.id).then((result) => {
      return sameUserIdOrAdmin(hook, result.userId);
    });

  };
}

module.exports = restrictToOwnerOrAdmin;
