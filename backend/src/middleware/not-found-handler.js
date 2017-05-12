'use strict';

const path = require('path');

// not found errors should be handled by frontend
module.exports = function(app) {
  return function(req, res, next) {
    // next(new errors.NotFound('Page not found'));
    res.sendFile(path.join(app.get('public'), 'index.html'));
  };
};
