import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import searchedChat from './searchedChat';

const rootReducer = combineReducers({ searchedChat, routing: routerReducer });

export default rootReducer;
