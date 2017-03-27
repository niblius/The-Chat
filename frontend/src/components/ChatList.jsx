import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import ChatCard from './ChatCard.jsx';

class ChatList extends Component {
  constructor(props) {
    super(props);

    this.props.retrieveChats(this.props.currentUser.data.id);
  }

  render() {
    return (
      <Card.Group itemsPerRow={1}>
        {this.props.chats.map((chat, i) => ChatCard(chat, i))}
      </Card.Group>
    );
  }
}

export default ChatList;
