'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;
const validFindQuery = require('./validFindQuery');
const onlyRole = require('./onlyRole');
const validPatchQuery = require('./validPatchQuery');
const chatExistsAndFreeToJoin = require('./chatExistsAndFreeToJoin');
const cannotSetRole = require('./cannotSetRole');
const notJoinedAlready = require('./notJoinedAlready');
const setUserIdIfExternal = require('./setUserIdIfExternal');

const schema = {
  include: [
    {
      service: 'chats',
      parentField: 'ChatId',
      childField: 'id',
      nameAs: 'chat',
      include: [
        {
          service: 'messages',
          nameAs: 'messages',
          parentField: 'id',
          childField: 'ChatId',
          asArray: true
        },
        {
          service: 'chat-users',
          nameAs: 'chatUsers',
          parentField: 'id',
          childField: 'ChatId',
          asArray: true,
          include: [{
            service: 'users',
            nameAs: 'user',
            parentField: 'UserId',
            childField: 'id'
          }]
        }
      ]
    },
  ]
};

exports.before = { // TODO all the query restrictions
                   // TODO cannot set role
                   // restrict for only our user or only to the chat that current user have joined
                   // TODO ONLY UNIQUE
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [validFindQuery()],
  patch: [
    globalHooks.restrictToChatAdmin(),
    onlyRole(),
    validPatchQuery()
  ],
  create: [
    chatExistsAndFreeToJoin(),
    setUserIdIfExternal(),
    cannotSetRole(),
    notJoinedAlready()
  ],
  remove: [globalHooks.restrictToChatAdmin()]
};

exports.after = {
  all: [],
  find: [hooks.populate({ schema })],
  patch: [],
  create: [hooks.populate({ schema })],
  remove: []
};
