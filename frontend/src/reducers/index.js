import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import searchedChat from './searchedChat';
import currentUser from './currentUser'
import newChat from './newChat';
import chats from './chats';
import audioPlayer from './audioPlayer';
import userSearch from './userSearch';

const rootReducer = combineReducers({
  currentUser,
  searchedChat,
  newChat,
  chats,
  routing: routerReducer,
  audioPlayer,
  userSearch
});

export default rootReducer;
