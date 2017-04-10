function removeChatUsers() {
  return (hook) => {
    const chatUsers = hook.app.service('chat-users');
    return chatUsers.remove({query: { chatId: hook.result.id }});
  };
}

module.exports = removeChatUsers;
