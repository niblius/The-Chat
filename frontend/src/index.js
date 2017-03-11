import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

import App from './components/App.jsx';
import Home from './components/Home.jsx';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Router path='/' component={App}>
        <IndexRoute component={Home}></IndexRoute>
      </Router>
    </Router>
  </Provider>
);

ReactDOM.render(
  router,
  document.getElementById('root')
);
