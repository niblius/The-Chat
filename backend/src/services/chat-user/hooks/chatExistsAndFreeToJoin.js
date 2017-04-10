const BadRequest = require('feathers-errors').BadRequest;

function chatExistsAndFreeToJoin() {
  return (hook) => {
    if(!hook.params.provider)
      return hook;

    const chats = hook.app.service('chats');
    return chats.get(hook.data.chatId).then((result) => {
      if(!result.link)
        throw new BadRequest('Cannot join to the private chat.');

      return hook;
    }).catch((err) => {
        throw new BadRequest('No such chat.');
    });
  };
}

module.exports = chatExistsAndFreeToJoin;
