'use strict';

const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

const addAdmin = require('./addAdmin');
const removeChatUsers = require('./removeChatUsers');
const removeMessages = require('./removeMessages');
const globalHooks = require('../../../hooks');


exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
  ],
  find: [],
  get: [],
  create: [],
  update: [
    globalHooks.restrictToChatAdmin()
  ],
  patch: [
    globalHooks.restrictToChatAdmin()
  ],
  remove: [
    globalHooks.restrictToChatAdmin()
  ]
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [addAdmin()],
  update: [],
  patch: [],
  remove: [
    removeChatUsers(),
    removeMessages()
  ]
};
