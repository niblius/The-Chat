import React, { Component } from 'react';
import { Form, Button, Grid, Segment } from 'semantic-ui-react';
import { subscribeToChats } from '../services/api';

import ChatList from './ChatList.jsx';
import MessageList from './MessageList.jsx';
import UserList from './UserList';
import MessageRecorder from './MessageRecorder.jsx';

class ChatPage extends Component {
  constructor(props) {
    super(props);

    const userId = this.props.currentUser.data.id;

    this.props.retrieveChatList(userId);
    subscribeToChats(this.props.onMessageCreated);

    this.state = { text: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const userId = this.props.currentUser.data.id;
    this.props.sendMessage(this.state.text, userId, this.currentChat.id);
    this.setState({ text: '' });
  }

  render() {
    this.currentChat = this.props.chats.get(this.props.router.params.chatLink);
    const admin = (!this.currentChat)
      ? null
      : this.currentChat.users.find((u) => u.chatUser.role === 'admin');
    if (!this.currentChat) {
      return (
        <Grid>
          <ChatList chats={this.props.chats}
            current={this.props.router.params.chatLink}/>
          <Grid.Column stretched width={12}>
            <Segment>Choose the chat.</Segment>
          </Grid.Column>
        </Grid>
      );
    } else {
      return (
        <Grid>
          <ChatList chats={this.props.chats}
            current={this.props.router.params.chatLink}/>
          <Grid.Column stretched width={8}>
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

            <MessageRecorder
              sendMessage={(blob) =>
                this.props.sendAudioMessage(blob, this.currentChat.id)}/>

          </Grid.Column>
          <UserList
            users={this.currentChat.users}
            isAdmin={admin.id === this.props.currentUser.data.id}
            removeUser={(userId) => this.props.removeUser(userId, this.currentChat.id)}/>
        </Grid>
      );
    }
  }

}

export default ChatPage;
