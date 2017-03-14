'use strict';

const db = require('../../models');
const service = require('feathers-sequelize');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;
  const db = app.get('db');

  let options = {
    Model: db.User,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/users', service(options));

  // Get our initialize service to that we can bind hooks
  const userService = app.service('/users');

  // Set up our before hooks
  userService.before(hooks.before);

  // Set up our after hooks
  userService.after(hooks.after);
};
