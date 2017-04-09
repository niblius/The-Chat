'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;
const ShouldHaveChatId = require('./shouldHaveChatId');
const queryShouldHaveChatId = ShouldHaveChatId.query;
const dataShouldHaveChatId = ShouldHaveChatId.data;
const restrictToOwnerOrAdmin = require('./restrictToOwnerOrAdmin');
const restrictToJoined = require('./restrictToJoined');

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    restrictToJoined()
  ],
  find: [queryShouldHaveChatId()],
  create: [dataShouldHaveChatId()],
  remove: [restrictToOwnerOrAdmin()]
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  remove: []
};
