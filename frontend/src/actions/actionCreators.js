import {
  findChat,
  trySignup,
  tryLogin,
  tryLogout,
  tryCreateChat,
  tryRetrieveChatList,
  trySendTextMessage,
  tryJoinChat,
  tryRemoveChatUser,
  trySendAudioMessage,
  tryLoadAudio,
  tryFindUser,
  tryCreateJoinOffer } from '../services/api';
import { browserHistory } from 'react-router';

export function searchChat(link) {
  return async (dispatch) => {
    dispatch({
      type: 'CHAT_SEARCH_REQUESTED',
      link
    });
    const data = await findChat(link);
    console.log(data);
    dispatch({
      type: 'CHAT_SEARCH_DONE',
      data
    });
  };
}

// don't really want to use callback, be this is the way formsy works
function invalidateForm(err, invalidate) {
  if (invalidate && err.errors.length > 0) {
    const invalid = {};
    err.errors.forEach(
      ({path, message}) => invalid[path] = message );
    invalidate(invalid);
  }
}

export function signup(email, password, invalidate) {
  return async (dispatch) => {
    dispatch({
      type: 'SIGNUP_REQUESTED',
      email,
      password
    });
    try {
      const data = await trySignup(email, password);
      console.log(data);
      dispatch({
        type: 'SIGNUP_SUCCEEDED',
        data
      });
      await browserHistory.push('/login');
    } catch(err) {
      invalidateForm(err, invalidate);
      console.log(err);
      dispatch({
        type: 'SIGNUP_FAILED',
        err
      });
    }
  }
}

export function login(email, password, next) {
  return async (dispatch) => {
    dispatch ({
      type: 'LOGIN_REQUESTED',
      email,
      password,
      next
    });
    try {
      const user = await tryLogin(email, password);
      console.log(user);
      dispatch({
        type: 'LOGIN_SUCCEEDED',
        user
      });
    } catch(err) {
      console.log(err);
      dispatch({
        type: 'LOGIN_FAILED',
        err
      });
    }

    await browserHistory.push(next);
  };
}

export function authGood(user) {
  return {
    type: 'AUTH_GOOD',
    user
  }
}

export function logout() {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT_REQUESTED'
    });

    await tryLogout();

    dispatch({
      type: 'LOGOUT_DONE'
    });

    await browserHistory.push('');
  };
}

export function createNewChat(title, link, invalidate) {
  return async (dispatch) => {
    dispatch({
      type: 'CREATE_CHAT_REQUESTED',
      title,
      link
    });
    try {
      // required by the server
      if (link.length === 0)
        link = null;
      const data = await tryCreateChat(title, link);
      console.log(data);
      dispatch({
        type: 'CREATE_CHAT_SUCCEEDED',
        data
      });
      await browserHistory.push('/chats');
    } catch(err) {
      invalidateForm(err, invalidate);
      console.log(err);
      dispatch({
        type: 'CREATE_CHAT_FAILED',
        err
      });
    }
  };
}

export function retrieveChatList(userId) {
  return async (dispatch) => {
    dispatch({
      type: 'CHATS_REQUESTED'
    });
    try {
      const chats = await tryRetrieveChatList(userId);
      console.log(chats);
      dispatch({
        type: 'CHATS_RETRIEVE_SUCCEEDED',
        chats
      });
    } catch(err) {
      console.log(err);
      dispatch({
        type: 'CHATS_RETRIEVE_FAILED',
        err
      });
    }
  };
}

export function sendTextMessage(text, chatId) {
  return async (dispatch) => {
    dispatch({
      type: 'CREATE_MESSAGE_REQUESTED',
      text,
      chatId
    });
    try {
      const data = await trySendTextMessage(text, chatId);
      console.log(data);
      dispatch({
        type: 'CREATE_MESSAGE_SUCCEEDED',
        data
      });
    } catch(err) {
      console.log(err);
      dispatch({
        type: 'CREATE_MESSAGE_FAILED',
        err
      });
    }
  }
}

export function joinChat(chatId) {
  return async (dispatch) => {
    dispatch({
      type: 'JOIN_CHAT_REQUESTED',
      chatId
    });
    try {
      const data = await tryJoinChat(chatId);
      console.log(data);
      dispatch({
        type: 'JOIN_CHAT_SUCCEEDED',
        data
      });
      browserHistory.push('/chats');
    } catch(err) {
      console.log(err);
      dispatch({
        type: 'JOIN_CHAT_FAILED',
        err
      });
    }
  }
}

export function removeUser(userId, chatId) {
  return async (dispatch) => {
    dispatch({
      type: 'REMOVE_CHAT_USER_REQUESTED',
      userId,
      chatId
    });
    try {
      const data = await tryRemoveChatUser(userId, chatId);
      console.log('removed user: ');
      console.log(data);
      dispatch({
        type: 'REMOVE_CHAT_USER_SUCCEEDED',
        data
      });
    } catch(err) {
      console.log(err);
      dispatch({
        type: 'REMOVE_CHAT_USER_FAILED',
        err
      });
    }
  }
}

export function sendAudioMessage(blob, text, chatId) {
  return async (dispatch) => {
    dispatch({
      type: 'CREATE_AUDIO_MESSAGE_REQUESTED',
      blob,
      chatId
    });
    try {
      const data = await trySendAudioMessage(blob, text, chatId);
      console.log(data);
      dispatch({
        type: 'CREATE_AUDIO_MESSAGE_SUCCEEDED',
        data
      });
    } catch(err) {
      console.log(err);
      dispatch({
        type: 'CREATE_AUDIO_MESSAGE_FAILED',
        err
      });
    }
  }
}

export function startPlaying(playingType, chatId, messageId) {
  return {
    type: 'START_PLAYING',
    playingType,
    chatId,
    messageId
  };
}

export function forcedStartPlaying(playingType, chatId, messageId) {
  return (dispatch) => {
    dispatch(turnAutoplayOff());
    dispatch(startPlaying(playingType, chatId, messageId));
  }
}

export function stopPlaying() {
  return {
    type: 'STOP_PLAYING'
  };
}

export function loadAudioFor(message) {
  return async (dispatch) => {
    dispatch({
      type: 'AUDIO_BLOB_LOADING_REQUESTED'
    });
    try {
      const blob = await tryLoadAudio(message.blobId);
      console.log(blob);
      dispatch({
        type: 'AUDIO_BLOB_LOADED',
        blob: blob.uri,
        messageId: message.id,
        chatId: message.chatId
      });
    } catch(err) {
      console.log(err);
      dispatch({
        type: 'AUDIO_BLOB_LOADING_ERROR',
        err
      });
    }
  };
}

export function setAutoplayChatId(id) {
    return {
      type: 'SET_AUTO_PLAY_CHAT_ID',
      chatId: id
    };
}

export function turnAutoplayOff() {
  return {
    type: 'TURN_AUTO_PLAY_OFF'
  };
}

export function finishedPlaying() {
  return {
    type: 'FINISHED_PLAYING'
  };
}

export function createJoinOffer(userId, chatId) {
  return async (dispatch) => {
    dispatch({
      type: 'CREATE_JOIN_OFFER_REQUESTED',
      userId,
      chatId
    });

    try {
      const offer = await tryCreateJoinOffer(userId, chatId);
      console.log(offer);
      dispatch({
        type: 'CREATE_JOIN_OFFER_SUCCEEDED',
        offer
      });
    } catch(err) {
      console.log(err);
      dispatch({
        type: 'CREATE_JOIN_OFFER_FAILED',
        err
      });
    }
  };
}

export function findUser(email) {
  return async (dispatch) => {
    dispatch({
      type: 'USER_SEARCH_INITIATED'
    });
    try {
      const data = await tryFindUser(email);
      console.log(data);
      if (data.length > 0) {
        dispatch({
          type: 'USER_FOUND',
          user: data[0]
        });
      } else {
        dispatch({
          type: 'USER_NOT_FOUND'
        });
      }
    } catch(err) {
      console.log(err);
      dispatch({
        type: 'USER_SEARCH_ERROR',
        err
      });
    }
  };
}

export function clearSearch() {
  return {
    type: 'CLEAR_SEARCH'
  };
}
