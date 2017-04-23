import React from 'react';
import { Grid, List, Header } from 'semantic-ui-react'

import UserListItem from './UserListItem.jsx';

let UserList = ({ users, isAdmin, removeUser }) => {
  return (
    <Grid.Column width={4}>
      <Header>Users</Header>
      <List divided verticalAlign='middle'>
        { users.map((u) => UserListItem(u, isAdmin, removeUser)) }
      </List>
    </Grid.Column>
  );
}

export default UserList;
