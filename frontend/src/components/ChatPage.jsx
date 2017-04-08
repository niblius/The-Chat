import React, { Component } from 'react';
import { Form, Button, Grid, Segment } from 'semantic-ui-react';
import { subscribeToChats } from '../services/api';
// import { browserHistory } from 'react-router';

import ChatList from './ChatList.jsx';
import MessageList from './MessageList.jsx';

class ChatPage extends Component {
  constructor(props) {
    super(props);

    const userId = this.props.currentUser.data.id;

    this.props.retrieveChatList(userId);
    subscribeToChats(this.props.onMessageCreated);

    this.state = { text: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showChatOrEmptyPage = this.showChatOrEmptyPage.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const userId = this.props.currentUser.data.id;
    this.props.sendMessage(this.state.text, userId, this.currentChat.id);
    this.setState({ text: '' });
  }

  render() {
    this.currentChat = this.props.chats.get(this.props.router.params.chatLink);
    return (
      <Grid>
        <ChatList chats={this.props.chats} current={this.props.router.params.chatLink}/>
        {this.showChatOrEmptyPage()}
      </Grid>
    );
  }

  showChatOrEmptyPage() {
    if (!this.currentChat) {
      return (
        <Grid.Column stretched width={12}>
          <Segment>Choose the chat.</Segment>
        </Grid.Column>
      );
    }

    return (
      <Grid.Column stretched width={12}>
        <MessageList
          messages={this.currentChat.messages}
          users={this.currentChat.users}
          chatName={this.currentChat.title} />
        <Form onSubmit={this.handleSubmit}>
          <Form.TextArea
            onChange={(e) => this.setState({text: e.target.value})}
            value={this.state.text}/>
          <Button content='Send' labelPosition='left' icon='send' primary />
        </Form>
      </Grid.Column>
    );
  }
}

export default ChatPage;
