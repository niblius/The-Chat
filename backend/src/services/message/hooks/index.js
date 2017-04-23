'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;
const shouldHaveChatId = require('./shouldHaveChatId');
const restrictToOwnerOrAdmin = require('./restrictToOwnerOrAdmin');
const addUsersField = require('./addUsersField');

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.restrictToJoined()
  ],
  find: [shouldHaveChatId()], // maybe don't need this, already checked in restrictToJoined
  create: [shouldHaveChatId()],
  remove: [restrictToOwnerOrAdmin()]
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [
    addUsersField() // use this to make event filter working
  ],
  remove: []
};
