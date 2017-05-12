import { app } from '../store';

export function findChat(link) {
  const chats = app.service('chats');
  return chats.find({
    query: {
      '$limit': 1,
      link
    }
  }).then((data, err) => data.data);
}

export function trySignup(email, password) {
  const users = app.service('users');
  return users.create({email, password})
          .then((data, err) => data);
}

export function tryLogin(email, password) {
  return app.authenticate({
      type: 'local',
      email,
      password
    })
    .then(resp => resp );
}

export function tryLogout() {
  return app.logout();
}

export function tryCreateChat(title, link) {
  const chats = app.service('chats');
  return chats.create({title, link})
          .then((data, err) => data);
}

export function tryRetrieveChatList(userId) {
  const chatUsers = app.service('chat-users');
  return chatUsers.find({
    query: {
      userId
    }
  })
  .then((result) => {
    console.log(result);
    const chats = new Map();
    result.data.forEach(({ chat }) => {
      chats.set(chat.link, chat)
    });
    return chats;
  });
}

export function trySendTextMessage(body, chatId) {
  const messages = app.service('messages');
  return messages.create({body, chatId})
    .then((data) => data);
}

export function tryJoinChat(chatId) {
  const chatUsers = app.service('chat-users');
  return chatUsers.create({chatId});
}

export function subscribeToOnCreateMessage(messageReceived) {
  const messages = app.service('messages');
  messages.on('created', messageReceived);
}

export function removeAllOnCreateMessageListeners() {
  const messages = app.service('messages');
  messages.removeAllListeners('created');
}

export function tryRemoveChatUser(userId, chatId) {
  const chatUsers = app.service('chat-users');
  return chatUsers.remove(null, { query: {userId, chatId} })
    .then((res) => res[0]);
}

export function trySendAudioMessage(blob, text, chatId) {
  const audioMessages = app.service('audio-messages');
  const promise = Promise.resolve();
  return promise.then(() => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    }).then((result) => {
      return audioMessages
        .create({uri: result, chatId, body: text});
    });
  });
}

export function tryLoadAudio(blobId) {
  const audioMessages = app.service('audio-messages');
  return audioMessages.get(blobId);
}
