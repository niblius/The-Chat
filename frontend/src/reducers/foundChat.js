function foundChat(state = null, action) {
  switch (action.type) {
    case 'CHAT_SEARCH_SUCCEEDED':
      return action.chat;

    default:
      return state;
  }
}

export default foundChat;
