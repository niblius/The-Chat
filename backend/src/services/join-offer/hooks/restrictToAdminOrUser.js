const BadRequest = require('feathers-errors').BadRequest;

module.exports = () = {
  return (hook) => {
    const query = hook.params.query;
    const user = hook.params.user;
    if (query.userId == null && query.chatId == null) {
      query.userId = user.id;
    }
    else if (query.userId !== user.id) {
      if(query.chatId != null) {
        return restrictToChatAdmin(hook);
      } else {
        throw new BadRequest('Forbidden to access join offers of someone else.');
      }
    }
  };
}
