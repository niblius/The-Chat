const BadRequest = require('feathers-errors').BadRequest;

function notJoinedAlready() {
  return (hook) => {
    const chatUsers = hook.app.service('chat-users');
    return chatUsers.find({query: {
      userId: hook.data.userId,
      chatId: hook.data.chatId
    }}).then((result) => {
      if (result.total)
        throw new BadRequest('Such chat-user already exists.');

      return hook;
    });
  };
}

module.exports = notJoinedAlready;
