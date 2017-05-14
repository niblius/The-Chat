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
    [newChat.link || newChat.id.toString(), newChat]
  ]);
}

function removeChatUserSucc(action, state) {
  const chat = findChatById(action.data.chatId, state.values());
  const users = chat.users.filter((u) => u.id !== action.data.userId);
  const newChat = {...chat, users};
  return getNewStateWithChat(newChat, state);
}

function messageReceived(action, state) {
  const chat = findChatById(action.message.chatId, state.values())
  const messages = [...chat.messages, action.message];
  const newChat = {...chat, messages};
  return getNewStateWithChat(newChat, state);
}

function audioBlobLoaded(action, state) {
  const chat = findChatById(action.chatId, state.values());
  let i = 0;
  for(; i < chat.messages.length; i++) {
    if (chat.messages[i].id === action.messageId)
      break;
  }
  const newMessage = {...chat.messages[i], blob: action.blob};
  const messages = [
    ...chat.messages.slice(0, i),
    newMessage,
    ...chat.messages.slice(i+1)
  ];
  const newChat = {...chat, messages};
  return getNewStateWithChat(newChat, state);
}

// TODO remove chat
function chats(state = new Map(), action) {
  switch (action.type) {
    case 'CHATS_RETRIEVE_SUCCEEDED':
      const newState = new Map([...state, ...action.chats]);
      return newState;

    case 'MESSAGE_RECEIVED':
      return messageReceived(action, state);

    case 'REMOVE_CHAT_USER_SUCCEEDED':
      return removeChatUserSucc(action, state);

    case 'AUDIO_BLOB_LOADED':
      return audioBlobLoaded(action, state);

    default:
      return state;
  }
}


export default chats;
