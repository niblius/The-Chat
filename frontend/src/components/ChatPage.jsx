import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
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
            current={this.props.router.params.chatLink}
            playingId={this.props.audioPlayer.chatId}/>
          <Grid.Column stretched width={8}>
            <MessageList
              messages={this.currentChat.messages}
              users={this.currentChat.users}
              chatName={this.currentChat.title} />
            <MessageRecorder
              chatId={this.currentChat.id}
              sendAudioMessage={this.props.sendAudioMessage}
              sendTextOnlyMessage={this.props.sendTextMessage}/>
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
