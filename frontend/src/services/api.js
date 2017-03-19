import { app } from '../store';

export function findChat(link) {
  const chats = app.service('chats');
  return chats.find({
    query: {
      '$limit': 1,
      link
    }
  }).then((data, err) => data.data)
    .catch(e => {console.log(e)});
}

export function tryCreateChat() {

}

export function trySignup(email, password) {
  const users = app.service('users');
  return users.create({email, password})
          .then((data, err) => data)
          .catch(e => {console.log(e)});
}

export function tryLogin(email, password) {
  return app.authenticate({
      type: 'local',
      email,
      password
    })
    .then(resp => resp )
    .catch(e => {console.log(e)});
}

export function tryLogout(app) {
  return app.logout();
}
