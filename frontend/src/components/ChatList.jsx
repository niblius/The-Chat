import React from 'react';
import { Grid, Menu } from 'semantic-ui-react'

import ChatMenuItem from './ChatMenuItem.jsx';

function formList(chats, current, playingId, autoplayChatId) {
  const list = [];
  for (const [key, chat] of chats) {
    list.push(ChatMenuItem(
      chat,
      key === current,
      chat.id === playingId,
      chat.id === autoplayChatId));
  }
  return list;
}

let ChatList = ({ chats, current, audioPlayer }) => {
  const playingId = (audioPlayer.playingType) ? audioPlayer.chatId : null;
  const autoplayChatId = audioPlayer.autoplayChatId;
  return (
    <Grid.Column width={4}>
      <Menu fluid vertical tabular>
        { formList(chats, current, playingId, autoplayChatId) }
      </Menu>
    </Grid.Column>
  );
}

export default ChatList;
