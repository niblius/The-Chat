import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react'

import ChatCard from './ChatCard.jsx';

function formList(chats) {
  const list = [];
  for (const [, chat] of chats) {
    list.push(ChatCard(chat));
  }
  return list;
}

let ChatList = ({ chats }) => {
  return (
    <Card.Group itemsPerRow={1}>
      { formList(chats) }
    </Card.Group>
  );
}

const mapStateToProps = (state) => {
  return { chats: state.chats }
};

ChatList = connect(mapStateToProps, {})(ChatList);

export default ChatList;
