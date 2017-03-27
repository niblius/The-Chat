import React from 'react';
import { Card } from 'semantic-ui-react'
import { browserHistory } from 'react-router';

const ChatCard = ({ id, title }, i) => (
  <Card
    centered
    header={title}
    key={i}
    onClick={() => browserHistory.push(`/chats/${id}`)}
  />
);

export default ChatCard;
