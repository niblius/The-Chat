const BadRequest = require('feathers-errors').BadRequest;

exports.query = () => {
  return (hook) => {
    if (hook.params.query.ChatId === null) {
      throw new BadRequest('ChatId cannot be null or undefined');
    }

    return hook;
  };
}

exports.data = () => {
  return (hook) => {
    if (hook.data.ChatId === null) {
      throw new BadRequest('ChatId cannot be null or undefined');
    }

    return hook;
  };
}
