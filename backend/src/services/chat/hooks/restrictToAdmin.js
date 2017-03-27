const Forbidden = require('feathers-errors');

function restrictToAdmin() {
  return (hook) => {
    const db = hook.app.get()
    return db.ChatUser.get({
      where: {
        UserId: hook.params.user.id,
        ChatId: hook.params.id,
        role: "admin"
      }
    }).then((result) => {
      if (!result) {
        throw new Forbidden("Access denied.");
      }
      return hook;
    });
  };
}

module.exports = restrictToAdmin;
