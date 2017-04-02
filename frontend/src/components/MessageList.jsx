import React from 'react';
import { Comment, Header } from 'semantic-ui-react';

import Message from './Message.jsx';

let MessageList = ({ messages, users }) => {
  return (
    <Comment.Group>
      <Header as='h3' dividing>Comments</Header>
      {
        // TODO what if user not found in the list? should request for
        messages.map( (m) => Message(m, users.find((u) => u.id === m.UserId)) )
      }
    </Comment.Group>
  );
}

export default MessageList;
