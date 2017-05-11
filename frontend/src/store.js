import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'
import feathers from 'feathers-client';
import soceketio from 'feathers-socketio/client';
import io from 'socket.io-client';

import rootReducer from './reducers/index';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // debug
  applyMiddleware(thunk)
);

const host = 'http://178.62.45.129';
const socket = io(host);
export const app = feathers()
  .configure(soceketio(socket))
  .configure(feathers.hooks())
  .configure(feathers.authentication({ storage: window.localStorage }));

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
