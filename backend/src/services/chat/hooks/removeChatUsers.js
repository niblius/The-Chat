function removeChatUsers() {
  return (hook) => {
    const chatUsers = hook.app.service('chat-users');
    return chatUsers.remove({query: { ChatId: hook.result.id }});
  };
}

module.exports = removeChatUsers;
