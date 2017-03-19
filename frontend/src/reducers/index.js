import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import searchedChat from './searchedChat';
import currentUser from './currentUser'
import newChat from './newChat';

const rootReducer = combineReducers({
  currentUser,
  searchedChat,
  newChat,
  routing: routerReducer
});

export default rootReducer;
