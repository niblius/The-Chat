const hooks = require('./hooks');
const service = require('feathers-sequelize');

module.exports = function(){
  const app = this;

  let options = {
    Model: app.db.Chat,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/chats', service(options));

  // Get our initialize service to that we can bind hooks
  const chatService = app.service('/chats');

  // Set up our before hooks
  chatService.before(hooks.before);

  // Set up our after hooks
  chatService.after(hooks.after);
};
