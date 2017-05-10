const globalHooks = require('../../../hooks');
const auth = require('feathers-authentication').hooks;
const createMessage = require('./createMessage');
const shouldHaveChatId = require('../../message/hooks/shouldHaveChatId');

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.restrictToJoined()
  ],
  // TODO validations of size
  get: [],
  create: [shouldHaveChatId(), cannotSetKey()]
};

exports.after = {
  all: [],
  get: [],
  create: [createMessage()]
};
