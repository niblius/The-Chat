import React from 'react';
import { List, Image, Icon } from 'semantic-ui-react'
import { browserHistory } from 'react-router';

const UserListItem = (user, isAdmin, removeUser) => {
  const atSignIndex = user.email.indexOf('@');
  let nickname = user.email.substring(0, atSignIndex);
  nickname = (nickname.length < 20) ? nickname : `${nickname.substring(0, 20)}...`;
  const redirectToProfile = () => browserHistory.push(`/users/${user.id}`);
  return (
    <List.Item key={user.id}>
      <Image
        avatar
        src={`https://unsplash.it/64/64?image=${user.id}`}
        onClick={redirectToProfile} />
      <List.Content onClick={redirectToProfile}>
        {nickname}
        <List.Description>{user.chatUser.role}</List.Description>
      </List.Content>
      {(isAdmin) ?
        (<List.Content floated='right' onClick={() => removeUser(user.id)}>
          <Icon color='red' name='remove' size='large'/>
        </List.Content>)
      : ''}
    </List.Item>
  );
}

export default UserListItem;
