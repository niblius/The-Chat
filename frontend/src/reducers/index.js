import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import searchedChat from './searchedChat';
import currentUser from './currentUser';
import chats from './chats';
import audioPlayer from './audioPlayer';
import userSearch from './userSearch';

const rootReducer = combineReducers({
  currentUser,
  searchedChat,
  chats,
  routing: routerReducer,
  audioPlayer,
  userSearch
});

export default rootReducer;
