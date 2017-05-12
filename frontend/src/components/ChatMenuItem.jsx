import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

const ChatCard = ({ title, link }, isActive, isPlaying, isAutoplayOn) => (
  <Menu.Item
    key={link}
    active={isActive}
    onClick={() => browserHistory.push(`/chats/${link}`)}>
      {title}
      {(isPlaying) ? (<Icon name='music'/>) : null}
      {(isAutoplayOn) ? (<Icon name='retweet'/>) : null}
    </Menu.Item>
);

export default ChatCard;
