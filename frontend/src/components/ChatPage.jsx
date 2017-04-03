import React, { Component } from 'react';
import { Form, Button, Grid, Segment } from 'semantic-ui-react';
// import { browserHistory } from 'react-router';

import ChatList from './ChatList.jsx';
import MessageList from './MessageList.jsx';

class ChatPage extends Component {
  constructor(props) {
    super(props);

    const userId = this.props.currentUser.data.id;

    this.props.retrieveChatList(userId);

    this.body = '';
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showChatOrEmptyPage = this.showChatOrEmptyPage.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const userId = this.props.currentUser.data.id;
    this.props.sendMessage(this.body, userId, this.currentChat.id);
  }

  render() {
    this.currentChat = this.props.chats.get(this.props.router.params.chatLink);
    return (
      <Grid>
        <ChatList chats={this.props.chats} current={this.props.router.params.chatLink}/>
        <Grid.Column stretched width={12}>{this.showChatOrEmptyPage()}</Grid.Column>
      </Grid>
    );
  }

  showChatOrEmptyPage() {
    if (!this.currentChat) {
      return (<Segment>Choose the chat</Segment>);
    }
    return (
      <div>
        <MessageList
          messages={this.currentChat.messages}
          users={this.currentChat.users}
          chatName={this.currentChat.title} />
        <Form onSubmit={this.handleSubmit}>
          <Form.TextArea onChange={(e) => this.body = e.target.value}/>
          <Button content='Send' labelPosition='left' icon='send' primary />
        </Form>
      </div>
    );
  }
}

export default ChatPage;
