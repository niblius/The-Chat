'use strict';

const Forbidden = require('feathers-errors').Forbidden;

// find - checks query
// get - checks id
// update, patch, remove - checks query and id
// if id is null - check query, if it is not null - get the object
// and check the chatId
// create - checks data
// the idea is that chatId should never be changed,
// therefore we check only create method data
exports.restrictToJoined = (hook, role) => {
  (hook) => {
    if (!hook.provider) {
      return hook;
    }

    const userId = hook.params.user.id;
    let chatId, objId = null;
    if (hook.method.match('get')) {
      objId = hook.id;
    } else if (hook.method.match('find')) {
      chatId = hook.params.query.chatId;
    } else if (hook.method.match('create')) {
      chatId = hook.data.chatId
    } else if (hook.method.match('patch|update|remove')) {
      if (hook.id !== null || hook.id !== undefined) { // check id
        objId = hook.id;
      } else {  // check query
        chatId = hook.params.query.chatId;
      }
    }

    if (objId === null) {
      return isJoined(hook, userId, chatId, role);
    } else {
      return hook.service.get(objId).then((res) => {
        return isJoined(hook, userId, res.chatId, role);
      });
    }
  }
}

exports.restrictToJoinedThrows = (role) => {
  return (hook) => {
    return restrictToJoined(role)(hook).then((joined) => {
      if (!joined) {
        let msg;
        if (role)
          msg = `You are not ${role} of this chat.`
        else
          msg = 'You are not in this chat.'

        throw new Forbidden(msg);
      }
      return hook;
    });
  }
}

function isJoined(hook, userId, chatId, role) {
  const query = {
    query: {
      chatId,
      userId
    }
  };

  if (role) {
    query.role = role;
  }

  const chatUsers = hook.app.service('chat-users');
  return chatUsers.find(query).then((result) => {
    if (result.total === 0)
      return null;
    else
      return hook;
  });
}

exports.restrictToChatAdmin = () => {
  return (hook) => {
    return restrictToJoinedThrows('admin')(hook);
  };
}
