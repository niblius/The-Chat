const BadRequest = require('feathers-errors').BadRequest;

function shouldHaveUserId() {
  return (hook) => {
    if (!hook.params.query.userId) {
      throw new BadRequest(
        'Query should have chatId and userId to delete a chat-user item.');
    }
  };
}

module.exports = shouldHaveUserId;
