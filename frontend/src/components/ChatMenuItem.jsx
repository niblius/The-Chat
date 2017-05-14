import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

const ChatCard = ({ title, link, id }, isActive, isPlaying, isAutoplayOn) => {
  return (<Menu.Item
    key={link || id}
    active={isActive}
    onClick={() => browserHistory.push(`/chats/${link || id}`)}>
      {title}
      {(isPlaying) ? (<Icon name='music'/>) : null}
      {(isAutoplayOn) ? (<Icon name='retweet'/>) : null}
    </Menu.Item>);
};

export default ChatCard;
