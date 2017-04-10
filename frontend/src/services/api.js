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
    console.log(result); // TODO change sequelize naming to more convenient one
    const chats = new Map();
    result.data.forEach(({ chat }) => {
      chats.set(chat.link, chat)
    });
    return chats;
  });
}

export function trySendMessage(body, userId, chatId) {
  const messages = app.service('messages');
  return messages.create({body, userId, chatId})
    .then((data, err) => data);
}

export function tryJoinChat(chatId) {
  const chatUsers = app.service('chat-users');
  return chatUsers.create({chatId});
}

export function subscribeToChats(messageReceived) {
  const messages = app.service('messages');
  messages.on('created', messageReceived);
}
