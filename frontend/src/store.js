import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk';
import feathers from 'feathers/client';
import soceketio from 'feathers-socketio/client';

import rootReducer from './reducers/index';

const defaultStore = {};

const store = createStore(
  rootReducer,
  defaultStore,
  applyMiddleware(thunk)
);

const host = 'http://localhost:3030';
export const app = feathers()
  .configure(soceketio(host))
  .configure(feathers.hooks())
  .configure(feathers.authentication({ store: window.localstorage }));

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
