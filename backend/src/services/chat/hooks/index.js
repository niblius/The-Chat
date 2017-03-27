'use strict';

const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

const globalHooks = require('../../../hooks');
const restrictToAdmin = require('./restrictToAdmin');
const addAdmin = require('./addAdmin');


exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
  ],
  find: [
  ],
  get: [
  ],
  create: [],
  update: [
    restrictToAdmin(),
  ],
  patch: [
    restrictToAdmin(),
  ],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [addAdmin()],
  update: [],
  patch: [],
  remove: []
};
