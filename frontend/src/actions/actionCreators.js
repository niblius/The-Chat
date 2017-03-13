import { findChat, trySignup, tryLogin, tryLogout } from '../services/api';
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

    await logout();

    dispatch({
      type: 'LOGOUT_DONE'
    });
  };
}
