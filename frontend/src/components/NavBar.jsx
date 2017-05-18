import React, { Component } from 'react'
import { Menu, Icon, Popup } from 'semantic-ui-react'
import { browserHistory } from 'react-router';

import JoinOffersModal from './JoinOffersModal.jsx';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {showOffersModal: false};
  }

  openOffersModal = () => {
    this.setState({showOffersModal: true});
  }

  closeOffersModal = () => {
    this.setState({showOffersModal: false});
  }

  loggedIn = () => {
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

  loggedOut = () => {
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

  showJoinOffersModalIfAny = () => {
    if (this.props.joinOffers.length > 0) {
      return (<JoinOffersModal
                open={this.state.showOffersModal}
                onClose={this.closeOffersModal}
                onOpen={this.openOffersModal}/>);
    }
  }

  showJoinOffersPopupIfAny = () => {
    const offersCount = this.props.joinOffers.length;
    if (offersCount > 0) {
      const menuItem = (<Menu.Item
                          name='joinOffers'
                          onClick={this.openOffersModal}>
                          <Icon
                            name='smile'
                            color='blue'
                            size='large'
                            style={{marginTop:'3px'}}/>
                          Invites
                        </Menu.Item>);
      return (<Popup
                trigger={menuItem}
                content={'You were invited to '
                        + offersCount
                        + ((offersCount > 1) ? ' chats.' : ' chat.')}/>);
    }
  }

  render() {
    const isLoggedIn = this.props.currentUser.hasOwnProperty('data');
    return (
      <Menu>
        {this.showJoinOffersPopupIfAny()}
        {this.showJoinOffersModalIfAny()}
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
