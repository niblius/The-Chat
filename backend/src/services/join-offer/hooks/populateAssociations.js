module.exports = () => {
  return (hook) => {
    const db = hook.app.db;
    const sequelize = {
      include: [
        { model: db.User, as: 'issuedBy', attributes: { exclude: ['password'] }},
        { model: db.User, as: 'user', attributes: { exclude: ['password'] }},
        { model: db.Chat }
      ]
    };

    if (hook.type == 'before') {
      hook.params.sequelize = sequelize;
      return hook;
    } else {
      // since populate hook requires sequelize.raw: true, but we create method doesn't accept raw: true.
      let id;
      if (hook.result.Instance && hook.result.Instance.dataValues) {
        id = hook.result.dataValues.Instance.id
      } else {
        id = hook.result.id;
      }
      const query = Object.assign({}, sequelize, {where: {id}});
      return db.JoinOffer.findOne(query).then(result => {
        hook.result = result;
        return hook;
      });
    }
  }
}
