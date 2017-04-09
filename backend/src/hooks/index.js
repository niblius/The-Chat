'use strict';

const Forbidden = require('feathers-errors').Forbidden;

exports.restrictToJoined = (hook, UserId, ChatId, role) => {
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
      throw new Forbidden('You are not in this chat.');
    }
    return hook;
  });
}

exports.restrictToChatAdmin = () => {
  return (hook) => {
    globalHooks.restrictToJoined(hook,
      hook.params.user.id, hook.params.ChatId, 'admin');
  };
}
