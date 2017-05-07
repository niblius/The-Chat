'use strict';
const chat = require('./chat');
const authentication = require('./authentication');
const user = require('./user');
const chatUser = require('./chat-user');
const message = require('./message');
const audioMessage = require('./audio-message');

module.exports = function() {
  const app = this;

  app.configure(authentication);
  app.configure(user);
  app.configure(chat);
  app.configure(chatUser);
  app.configure(message);
  app.configure(audioMessage);
};
