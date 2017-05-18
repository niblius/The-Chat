'use strict';

const auth = require('feathers-authentication').hooks;
const globalHooks = require('../../../hooks');
const populateAssociations = require('./populateAssociations');
const restrictToAdminOrUser = require('./restrictToAdminOrUser');
const shouldHaveChatIdAndUserId = require('./shouldHaveChatIdAndUserId');
const setIssuedBy = require('./setIssuedBy');
const preventIssuingToSelf = require('./preventIssuingToSelf');

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [
    restrictToAdminOrUser(),
    populateAssociations()
  ],
  get: [
    populateAssociations()
  ],
  create: [
    // TODO add role
    setIssuedBy(),
    preventIssuingToSelf(),
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
  get: [
    restrictToAdminOrUser()
  ],
  create: [
    populateAssociations()
  ],
  remove: []
};
