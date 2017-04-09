const restrictToAdmin = require('../../../hooks').restrictToAdmin;

function sameUserIdOrAdmin(hook, UserId) {
  if (hook.params.user.id !== UserId) {
    return restrictQueryToChatAdmin()(hook);
  }
  return hook;
}

function restrictToOwnerOrAdmin() {
  return (hook) => {
    if (!hook.provider) {
      return hook;
    }

    if (hook.id === null) {
      sameUserIdOrAdmin(hook, hook.params.query.UserId);
    }

    const messages = hook.app.service('messages');
    return messages.get(hook.id).then((result) => {
      return sameUserIdOrAdmin(hook, result.UserId);
    });

  };
}

module.exports = restrictToOwnerOrAdmin;
