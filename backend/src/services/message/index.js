'use strict';

const db = require('../../models');
const service = require('feathers-sequelize');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  let options = {
    Model: app.db.Message,
    paginate: {
      default: 32,
      max: 256
    }
  };

  app.use('/messages', service(options));

  const messageService = app.service('/messages');

  messageService.before(hooks.before);

  messageService.after(hooks.after);

  messageService.filter({
    created: (data, connection, hook) => {
      // TODO VERY inefficient, should be fixed in next version of feathers
      if(!hook.params.users.find((u) => u.id === connection.user.id)) {
        return false;
      }

      return data;
    }
  });
};
