module.exports = () => {
  return (hook) => {
    const joinOffers = hook.app.service('join-offers');
    return joinOffers.remove(null, {query: {
      userId: hook.params.user.id,
      chatId: hook.data.chatId
    }}).then(() => hook);
  };
}
