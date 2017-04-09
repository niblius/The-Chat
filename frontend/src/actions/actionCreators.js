import {
  findChat,
  trySignup,
  tryLogin,
  tryLogout,
  tryCreateChat,
  tryRetrieveChatList,
  trySendMessage,
  tryJoinChat } from '../services/api';
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

export function signup(email, password) {
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
    } catch(err) {
      console.log(err);
      dispatch({
        type: 'SIGNUP_FAILED',
        err
      });
    }

    await browserHistory.push('/login');
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

export function setLink(link) {
  return {
    type: 'SET_LINK',
    link
  }
}

export function setTitle(title) {
  return {
    type: 'SET_TITLE',
    title
  }
}

export function createNewChat(title, link) {
  return async (dispatch) => {
    dispatch({
      type: 'CREATE_CHAT_REQUESTED',
      title,
      link
    });
    try {
      const data = await tryCreateChat(title, link);
      console.log(data);
      dispatch({
        type: 'CREATE_CHAT_SUCCEEDED',
        data
      });
    } catch(err) {
      console.log(err);
      dispatch({
        type: 'CREATE_CHAT_FAILED',
        err
      });
    }

    await browserHistory.push('/chats');
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

export function sendMessage(text, userId, chatId) {
  return async (dispatch) => {
    dispatch({
      type: 'CREATE_MESSAGE_REQUESTED',
      text,
      userId,
      chatId
    });
    try {
      const data = await trySendMessage(text, userId, chatId);
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

export function onMessageCreated(message) {
  return async (dispatch) => {
    console.log(message);
    dispatch({
      type: 'MESSAGE_RECEIVED',
      message
    });
  };
}
