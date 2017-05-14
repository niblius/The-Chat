'use strict';

const auth = require('feathers-authentication').hooks;
const globalHooks = require('../../../hooks');
const populateAssociations = require('./populateAssociations');
const restrictToAdminOrUser = require('./restrictToAdminOrUser');
const shouldHaveChatIdAndUserId = requrie('./shouldHaveChatIdAndUserId');

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    populateAssociations()
  ],
  find: [
    restrictToAdminOrUser()
  ],
  create: [
    globalHooks.restrictToChatAdmin()
  ],
  remove: [
    shouldHaveChatIdAndUserId(),
    restrictToAdminOrUser()
  ]
};

exports.after = {
  all: [],
  find: [],
  create: [,
  remove: []
};
