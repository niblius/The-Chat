function searchedChat(state = {}, action) {
  switch (action.type) {
    case 'CHAT_SEARCH_DONE':
      return action.data.length ? action.data[0] : {};

    default:
      return state;
  }
}

export default searchedChat;
