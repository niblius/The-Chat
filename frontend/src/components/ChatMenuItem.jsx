import React from 'react';
import { Menu } from 'semantic-ui-react'
import { browserHistory } from 'react-router';

const ChatCard = ({ title, link }, isActive) => (
  <Menu.Item
    name={title}
    key={link}
    active={isActive}
    onClick={() => browserHistory.push(`/chats/${link}`)}
  />
);

export default ChatCard;
