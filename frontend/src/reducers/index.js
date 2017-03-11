import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import foundChat from './foundChat';

const rootReducer = combineReducers({ foundChat, routing: routerReducer });
