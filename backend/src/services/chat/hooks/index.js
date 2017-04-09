'use strict';

const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

const addAdmin = require('./addAdmin');
const removeChatUsers = require('./removeChatUsers');
const removeMessages = require('./removeMessages');
const restrictToAdmin = require('./restrictToAdmin');


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
    restrictToAdmin()
  ],
  patch: [
    restrictToAdmin()
  ],
  remove: [
    restrictToAdmin()
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
