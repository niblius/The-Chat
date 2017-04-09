'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    /*restrict to joined*/
    /*if userId -> should also be chatId and joined to that chat*/
  ],
  find: [],
  create: [],
  remove: [ /* restrictToAdmin() or user*/ ]
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  remove: []
};
