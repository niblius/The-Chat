var env = process.env.NODE_ENV || 'default';
const conf = require('./' + env + '.json');
module.exports = conf['db-settings'];
