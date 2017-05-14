import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { browserHistory } from 'react-router';

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.loggedIn = this.loggedIn.bind(this);
    this.loggedOut = this.loggedOut.bind(this);
  }

  loggedIn() {
    return (
     <Menu.Menu position='right'>
       <Menu.Item name='user' onClick={() => browserHistory.push('/profile')}>
        {this.props.currentUser.data.email}
       </Menu.Item>

       <Menu.Item name='logout' onClick={this.props.logout}>
         Logout
       </Menu.Item>
     </Menu.Menu>
    )
  }

  loggedOut() {
    return (
     <Menu.Menu position='right'>
       <Menu.Item name='signup' onClick={() => browserHistory.push('/signup')}>
          sign up
       </Menu.Item>

       <Menu.Item name='login' onClick={() => browserHistory.push('/login')}>
         login
       </Menu.Item>
     </Menu.Menu>
    )
  }

  render() {
    const isLoggedIn = this.props.currentUser.hasOwnProperty('data');
    return (
      <Menu>
        <Menu.Item name='myChats' onClick={() => browserHistory.push('/chats')}>
          My chats
        </Menu.Item>
        <Menu.Item name='createChat' onClick={() => browserHistory.push('/chats/new')}>
          Create chat
        </Menu.Item>

        {isLoggedIn ? this.loggedIn() : this.loggedOut()}
      </Menu>
    )
  }
}

export default NavBar;
