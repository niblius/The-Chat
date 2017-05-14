module.exports = () => {
  return (hook) => {
    const db = hook.app.db;
    hook.params.sequelize = {
      include: [
        { model: db.Chat },
        { model: db.User }
      ]
    };
  }
}
