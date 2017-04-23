function addUsersField() {
  return (hook) => {
    return hook.app.db.ChatUser.findAll({
      where: {chatId: hook.result.chatId},
      attributes: [['userId', 'id']],
      raw: true})
      .then((res) => {
        hook.params.users = res;
        return hook;
      });
  }
};

module.exports = addUsersField;
