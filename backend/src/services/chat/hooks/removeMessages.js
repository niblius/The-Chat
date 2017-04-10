function removeMessages() {
  return (hook) => {
    const messages = hook.app.service('messages');
    return chatUsers.remove({query: { chatId: hook.result.id }});
  };
}

module.exports = removeMessages;
