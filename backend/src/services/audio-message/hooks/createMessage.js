function createMessage() {
  return (hook) => {
    const messages = hook.app.service('messages');
    messages.create({
      userId: hook.params.user.id,
      chatId: hook.data.chatId,
      body: hook.data.body,
      blobId: hook.result.id
    });
  };
}

module.exports = createMessage;
