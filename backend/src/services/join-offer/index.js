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
  app.use('/join-offers', service(options));

  const joinOffers = app.service('/join-offers');

  joinOffers.before(hooks.before);
  joinOffers.after(hooks.after);

  joinOffers.filter({
    created: sendOnlyToTargetUser,
    removed: sendOnlyToTargetUser
  });
};

function sendOnlyToTargetUser(data, connection, hook) {
  if (data.userId !== connection.user.id) {
    return false;
  }

  return data;
}
