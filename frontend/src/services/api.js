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

export function tryRetrieveChatList(UserId) {
  const chatUsers = app.service('chat-users');
  return chatUsers.find({
    query: {
      UserId
    }
  })
  .then((result) => {
    const chats = new Map();
    result.data.forEach(({chat}) => {
      const chatFixed = {
        id: chat.id,
        link: chat.link,
        title: chat.title,
        users: chat.chatUsers.map((cu) => cu.user),
        messages: chat.messages,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt
      };
      chats.set(chatFixed.link, chatFixed)
    });
    return chats;
  });
}

export function trySendMessage(body, UserId, ChatId) {
  const messages = app.service('messages');
  return messages.create({body, UserId, ChatId})
    .then((data, err) => data);
}

export function tryJoinChat(ChatId, UserId) {
  const chatUsers = app.service('chat-users');
  return chatUsers.create({UserId, ChatId});
}
