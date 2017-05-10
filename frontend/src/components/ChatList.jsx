import React from 'react';
import { Grid, Menu } from 'semantic-ui-react'

import ChatMenuItem from './ChatMenuItem.jsx';

function formList(chats, current, playingId) {
  const list = [];
  for (const [key, chat] of chats) {
    list.push(ChatMenuItem(chat, key === current, chat.id === playingId));
  }
  return list;
}

let ChatList = ({ chats, current, playingId }) => {
  return (
    <Grid.Column width={4}>
      <Menu fluid vertical tabular>
        { formList(chats, current, playingId) }
      </Menu>
    </Grid.Column>
  );
}

export default ChatList;
