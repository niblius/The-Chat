module.exports = () => {
  return (hook) => {
    const db = hook.app.db;
    hook.params.sequelize = {
      include: [
        { model: db.User, as: 'issuedBy'},
        { model: db.User, as: 'user'},
        { model: db.Chat }
      ]
    };
  }
}
