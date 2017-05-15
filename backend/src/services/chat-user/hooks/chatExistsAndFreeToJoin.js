const BadRequest = require('feathers-errors').BadRequest;

function chatExistsAndFreeToJoin() {
  return (hook) => {
    if(!hook.params.provider)
      return hook;

    const chats = hook.app.service('chats');
    return chats.get(hook.data.chatId).then((result) => {
      // TODO use SEQUELIZE to COUNT both chat with such id and join request.
      if(!result.link) {
        const joinOffers = hook.app.service('join-offers');
        return joinOffers.find({
          query: {
            chatId: hook.data.chatId,
            userId: hook.params.user.id
          }
        }).then((result) => {
            if (!result) {
              throw new BadRequest('Cannot join to the private chat without join offer.');
            }
          });
      }

      return hook;
    }).catch((err) => {
        throw new BadRequest('No such chat.');
    });
  };
}

module.exports = chatExistsAndFreeToJoin;
