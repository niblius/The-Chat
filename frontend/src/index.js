import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history, app } from './store';

import App from './components/App.jsx';
import Home from './components/Home.jsx';
import SignupPage from './components/SignupPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import NewChatPage from './components/NewChatPage.jsx';

import { authGood } from './actions/actionCreators';
import { requireAuthentication } from './components/Auth';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path='/signup' component={SignupPage}></Route>
        <Route path='/login' component={LoginPage}></Route>
        <Route path='/chats/new' component={requireAuthentication(NewChatPage)}></Route>
      </Route>
    </Router>
  </Provider>
);

app.authenticate().then((user) => {
  store.dispatch(authGood(user));
  ReactDOM.render(
    router,
    document.getElementById('root')
  );
}, () => {
  ReactDOM.render(
    router,
    document.getElementById('root')
  );
});
