'use strict';

const db = require('../../models');
const service = require('feathers-sequelize');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  let options = {
    Model: app.db.ChatUser,
    paginate: {
      default: 10,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  const serv = service(options);
  delete serv.get;
  delete serv.update;
  app.use('/chat-users', service(options));

  // Get our initialize service to that we can bind hooks
  const chatUserService = app.service('/chat-users');

  // Set up our before hooks
  chatUserService.before(hooks.before);

  // Set up our after hooks
  chatUserService.after(hooks.after);
};
