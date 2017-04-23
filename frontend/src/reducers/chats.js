function chats(state = new Map(), action) {
  let newState, chat, newChat;
  switch (action.type) {
    case 'CHATS_RETRIEVE_SUCCEEDED':
      newState = new Map([...state, ...action.chats]);
      return newState;

    case 'MESSAGE_RECEIVED':
      chat = null;
      for (let c of state.values()) {
        if (c.id === action.message.chatId)
          chat = c;
      }
      const messages = [...chat.messages, action.message];
      newChat = {...chat, messages};
      newState = new Map([
        ...state,
        [newChat.link, newChat]
      ]);
      return newState;

    case 'REMOVE_CHAT_USER_SUCCEEDED':
      chat = null;
      for (let c of state.values()) {
        if (c.id === action.data.chatId)
          chat = c;
      }
      const users = chat.users.filter((u) => u.id !== action.data.userId);
      newChat = {...chat, users};
      newState = new Map([
        ...state,
        [newChat.link, newChat]
      ]);
      return newState;

    default:
      return state;
  }
}


export default chats;
