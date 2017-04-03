'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;

// TODO use 2 ui scheme, list of chats for the user, list of users for the chat
// for the first one done populate users, for the second one don't populate chat
const schemas = {
  'chatListScheme': {
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
  },
  'userListScheme': {
    include: [{
      service: 'users',
      nameAs: 'user',
      parentField: 'UserId',
      childField: 'id'
    }]
  }
};

exports.before = { // TODO all the query restrictions
                   // TODO cannot set role
                   // restrict for only our user or only to the chat that current user have joined
                   // TODO ONLY UNIQUE
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    hooks.client('schema')
  ],
  find: [],
  create: [],
  remove: [ /* restrictToAdmin()*/ ]
};

exports.after = {
  all: [
    hooks.populate(
      {
        schema: (hook) => {
          const schemaName = hook.params.schema || 'chatListScheme';
          return schemas[schemaName];
        }
      }
    )
  ],
  find: [],
  get: [],
  create: [],
  remove: []
};
