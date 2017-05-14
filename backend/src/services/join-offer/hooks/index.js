'use strict';

const auth = require('feathers-authentication').hooks;
const globalHooks = require('../../../hooks');
const populateAssociations = require('./populateAssociations');
const restrictToAdminOrUser = require('./restrictToAdminOrUser');
const shouldHaveChatIdAndUserId = require('./shouldHaveChatIdAndUserId');
const setIssuedBy = require('./setIssuedBy');

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
    // TODO add role
    // TODO throw if an offer with the same role already exists
    setIssuedBy(),
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
  create: [],
  remove: []
};
