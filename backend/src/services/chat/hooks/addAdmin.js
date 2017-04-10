function addAdmin() {
  return (hook) => {
    const chatUsers = hook.app.service('/chat-users');
    return chatUsers.create({
      userId: hook.params.user.id,
      chatId: hook.result.id,
      role: "admin"
    }).then(() => hook);
  };
}

module.exports = addAdmin;
