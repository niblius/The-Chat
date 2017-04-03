import React from 'react';
import { Grid, Menu } from 'semantic-ui-react'

import ChatMenuItem from './ChatMenuItem.jsx';

function formList(chats, current) {
  const list = [];
  for (const [key, chat] of chats) {
    list.push(ChatMenuItem(chat, key === current));
  }
  return list;
}

let ChatList = ({ chats, current }) => {
  return (
    <Grid.Column width={4}>
      <Menu fluid vertical tabular>
        { formList(chats, current) }
      </Menu>
    </Grid.Column>
  );
}

export default ChatList;
