'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;
const setUserId = require('./setUserId');


exports.before = { // TODO all the query restrictions
                   // TODO cannot set role
                   // restrict for only our user or only to the chat that current user have joined
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [],
  create: [],
  remove: [ /* restrictToAdmin()*/ ]
};

exports.after = {
  all: [
    hooks.populate('user', {
      service: 'users',
      field: 'UserId'
    }),
    hooks.populate('chat', {
      service: 'chats',
      field: 'ChatId'
    })
  ],
  find: [],
  get: [],
  create: [],
  remove: []
};
