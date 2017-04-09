const BadRequest = require('feathers-errors').BadRequest;

function notJoinedAlready() {
  return (hook) => {
    const chatUsers = hook.app.service('chat-users');
    return chatUsers.find({query: {
      UserId: hook.data.UserId,
      ChatId: hook.data.ChatId
    }}).then((result) => {
      if (result.total)
        throw new BadRequest('Such chat-user already exists.');

      return hook;
    });
  };
}

module.exports = notJoinedAlready;
