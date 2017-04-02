import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
// import { browserHistory } from 'react-router';

import ChatList from './ChatList.jsx';
import MessageList from './MessageList.jsx';

class ChatPage extends Component {
  constructor(props) {
    super(props);

    const userId = this.props.currentUser.data.id;
    this.props.retrieveChats(userId);

    this.body = '';
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const userId = this.props.currentUser.data.id;
    this.props.sendMessage(this.body, userId, this.currentChat.id);
  }

  render() {
    this.currentChat = this.props.chats.get(this.props.router.params.chatLink);
    return (
      <div>
        <ChatList/>
        { this.currentChat ?
          <div>
            <MessageList
              messages={this.currentChat.messages}
              users={this.currentChat.chats}/>
            <Form onSubmit={this.handleSubmit}>
              <Form.TextArea onChange={(e) => this.body = e.target.value}/>
              <Button content='Send' labelPosition='left' icon='send' primary />
            </Form>
          </div>
          : "Choose the chat" }
      </div>
    );
  }
}

export default ChatPage;
