function findChatById(id, chats) {
  for (let c of chats) {
    if (c.id === id)
      return c;
  }
  return null;
}

function getNewStateWithChat(newChat, oldState) {
  return new Map([
    ...oldState,
    [newChat.link, newChat]
  ]);
}

// TODO remove chat
// TODO use different functions for each case.
function chats(state = new Map(), action) {
  let chat, newChat, messages;
  switch (action.type) {
    case 'CHATS_RETRIEVE_SUCCEEDED':
      const newState = new Map([...state, ...action.chats]);
      return newState;

    case 'MESSAGE_RECEIVED':
      chat = findChatById(action.message.chatId, state.values())
      messages = [...chat.messages, action.message];
      newChat = {...chat, messages};
      return getNewStateWithChat(newChat, state);

    case 'REMOVE_CHAT_USER_SUCCEEDED':
      chat = findChatById(action.data.chatId, state.values());
      const users = chat.users.filter((u) => u.id !== action.data.userId);
      newChat = {...chat, users};
      return getNewStateWithChat(newChat, state);

    case 'AUDIO_BLOB_LOADED':
      chat = findChatById(action.chatId, state.values());
      let i = 0;
      for(; i < chat.messages.length; i++) {
        if (chat.messages[i].id === action.messageId)
          break;
      }
      const newMessage = {...chat.messages[i], blob: action.blob};
      messages = [
        ...chat.messages.slice(0, i),
        newMessage,
        ...chat.messages.slice(i+1)
      ];
      newChat = {...chat, messages};
      return getNewStateWithChat(newChat, state);

    default:
      return state;
  }
}


export default chats;
