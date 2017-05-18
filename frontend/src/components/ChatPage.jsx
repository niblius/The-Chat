import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import {
  subscribeToOnCreateMessage,
  subscribeToOnCreateOffer,
  subscribeToOnRemoveOffer,
  removeAllOnCreateMessageListeners } from '../services/api';
import { onMessageCreated } from '../actions/serviceListeners';

import ChatList from './ChatList.jsx';
import MessageList from './MessageList.jsx';
import UserList from './UserList';
import MessageRecorder from './MessageRecorder.jsx';

class ChatPage extends Component {
  constructor(props) {
    super(props);

    const userId = this.props.currentUser.data.id;

    this.props.retrieveChatList(userId);
  }

  componentDidMount() {
    subscribeToOnCreateMessage(
      onMessageCreated(this.props.dispatch, this.props.audioPlayer.autoplayChatId));
    this.props.loadJoinOffers();
    subscribeToOnCreateOffer(this.props.onJoinOfferCreated);
    subscribeToOnRemoveOffer(this.props.onJoinOfferRemoved);
  }

  componentWillReceiveProps(nextProps) {
    // resubscribes for new autoplayId
    const newAutoplayId = nextProps.audioPlayer.autoplayChatId;
    const oldAutoplayId = this.props.audioPlayer.autoplayChatId;
    if (oldAutoplayId !== newAutoplayId) {
      removeAllOnCreateMessageListeners();
      subscribeToOnCreateMessage(
        onMessageCreated(nextProps.dispatch, newAutoplayId));
    }
  }

  render() {
    this.currentChat = this.props.chats.get(this.props.router.params.chatUrl);
    const admin = (!this.currentChat)
      ? null
      : this.currentChat.users.find((u) => u.chatUser.role === 'admin');
    if (!this.currentChat) {
      return (
        <Grid>
          <ChatList
            chats={this.props.chats}
            current={this.props.router.params.chatUrl}
            audioPlayer={this.props.audioPlayer}/>
          <Grid.Column stretched width={12}>
            <Segment>Choose the chat.</Segment>
          </Grid.Column>
        </Grid>
      );
    } else {
      return (
        <Grid>
          <ChatList
            chats={this.props.chats}
            current={this.props.router.params.chatUrl}
            audioPlayer={this.props.audioPlayer}/>
          <Grid.Column stretched width={8}>
            <MessageList
              messages={this.currentChat.messages}
              users={this.currentChat.users}/>
            <MessageRecorder chatId={this.currentChat.id}/>
          </Grid.Column>
          <UserList
            isAdmin={admin.id === this.props.currentUser.data.id}
            removeUser={(userId) => this.props.removeUser(userId, this.currentChat.id)}
            chat={this.currentChat}/>
        </Grid>
      );
    }
  }

}

export default ChatPage;
