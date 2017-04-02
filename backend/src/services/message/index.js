'use strict';

const db = require('../../models');
const service = require('feathers-sequelize');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;
  const db = app.get('db');

  let options = {
    Model: db.Message,
    paginate: {
      default: 32,
      max: 256
    }
  };

  app.use('/messages', service(options));

  const messageService = app.service('/messages');

  messageService.before(hooks.before);

  messageService.after(hooks.after);
};
