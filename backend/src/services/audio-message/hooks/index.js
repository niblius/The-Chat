const globalHooks = require('../../../hooks');
const auth = require('feathers-authentication').hooks;
const createMessage = require('./createMessage');

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.restrictToJoined()
  ],
  find: [], // TODO should be message with {chatId}.
            // We already know that the user is really in that chat.
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [createMessage()],
  update: [],
  patch: [],
  remove: []
};
