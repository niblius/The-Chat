'use strict';

const Forbidden = require('feathers-errors').Forbidden;

exports.restrictToJoined = (hook, UserId, ChatId, role) => {
  if (!hook.params.provider)
    return hook;

  const query = {
    query: {
      ChatId,
      UserId
    }
  };

  if (role) {
    query.role = role;
  }

  const chatUsers = hook.app.service('chat-users');
  return chatUsers.find(query).then((result) => {
    if (!result.total) {
      let msg;
      if (role)
        msg = `You are not ${role} of this chat.`
      else
        msg = 'You are not in this chat.'

      throw new Forbidden(msg);
    }
    return hook;
  });
}

exports.restrictQueryToChatAdmin = () => {
  return (hook) => {
    globalHooks.restrictToJoined(hook,
      hook.params.user.id, hook.params.query.ChatId, 'admin');
  };
}
