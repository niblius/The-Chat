import React from 'react';
import { Comment } from 'semantic-ui-react'

const Message = ({ message, user }) => (
  <Comment>
    <Comment.Avatar src='/assets/images/avatar/small/matt.jpg' />
    <Comment.Content>
      <Comment.Author as='a'>User.email</Comment.Author>
      <Comment.Metadata>
        <div>Sent at {message.createdAt}</div>
      </Comment.Metadata>
      <Comment.Text>{message.body}</Comment.Text>
    </Comment.Content>
  </Comment>
);

export default Message;
