import React from 'react';
import { Grid, List, Header, Button} from 'semantic-ui-react'

import UserListItem from './UserListItem.jsx';
import AddUserModal from './AddUserModal.jsx';

let UserList = ({ chat, isAdmin, removeUser }) => {
  const users = chat.users;
  return (
    <Grid.Column width={4}>
      {isAdmin &&
        (<Header>
          <AddUserModal
            trigger={<Button
                        basic
                        name='user'
                        style={{width: '100%'}}
                        content='Add users'/>}
            chatId={chat.id}/>
        </Header>)}
      <List divided verticalAlign='middle'>
        { users.map((u) => UserListItem(u, isAdmin, removeUser)) }
      </List>
    </Grid.Column>
  );
}

export default UserList;
