import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import searchedChat from './searchedChat';
import currentUser from './checkLogin'

const rootReducer = combineReducers({
  currentUser,
  searchedChat,
  routing: routerReducer
});

export default rootReducer;
