function addAdmin() {
  return (hook) => {
    const chatUsers = hook.app.service('/chat-users');
    return chatUsers.create({
      UserId: hook.params.user.id,
      ChatId: hook.result.id,
      role: "admin"
    }).then(() => hook);
  };
}

module.exports = addAdmin;
