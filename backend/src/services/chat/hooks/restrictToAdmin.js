const Forbidden = require('feathers-errors').Forbidden;

const globalHooks = require('../../../hooks');

function restrictToAdmin() {
  return (hook) => {    
    try {
      return globalHooks.restrictToJoined(hook,
        hook.params.user.id, hook.params.query.ChatId, 'admin');
    } catch(err) {
      return globalHooks.restrictToJoined(hook,
        hook.params.user.id, hook.id, 'admin');
    }
  };
}

module.exports = restrictToAdmin;
