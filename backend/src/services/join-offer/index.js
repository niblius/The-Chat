const service = require('feathers-sequelize');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  let options = {
    Model: app.db.JoinOffer,
    paginate: {
      default: 10,
      max: 25
    }
  };

  const serv = service(options);
  delete serv.patch;
  delete serv.update;
  delete serv.get;
  app.use('/join-offers', service(options));

  const chatUserService = app.service('/join-offers');

  chatUserService.before(hooks.before);
  chatUserService.after(hooks.after);
};
