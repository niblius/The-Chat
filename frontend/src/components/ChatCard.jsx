import React from 'react';
import { Card } from 'semantic-ui-react'
import { browserHistory } from 'react-router';

const ChatCard = ({ title, link }) => (
  <Card
    centered
    header={title}
    key={link}
    onClick={() => browserHistory.push(`/chats/${link}`)}
  />
);

export default ChatCard;
