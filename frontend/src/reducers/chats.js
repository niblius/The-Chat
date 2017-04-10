function chats(state = new Map(), action) {
  let newState;
  switch (action.type) {
    case "CHATS_RETRIEVE_SUCCEEDED":
      newState = new Map([...state, ...action.chats]);
      return newState;

    /*
    // if no chat found
    case "CHATS_RETRIEVE_SUCCEEDED":
     const newState = new Map([...state, [action.chat.link, action.chat]]);
     return newState;
    */

    case "MESSAGE_RECEIVED":
      let chat = null;
      for (let c of state.values()) {
        if (c.id === action.message.chatId)
          chat = c;
      }
      const messages = [...chat.messages, action.message];
      const newChat = {...chat, messages};
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
