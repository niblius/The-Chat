import React from 'react';
import { Comment } from 'semantic-ui-react'

const Message = (message, user) => (
  <Comment key={message.id}>
    <Comment.Avatar src={`https://unsplash.it/64/64?image=${user.id}`} />
    <Comment.Content>
      <Comment.Author as='a'>{user.email}</Comment.Author>
      <Comment.Metadata>
        <div>Sent at {message.createdAt}</div>
      </Comment.Metadata>
      <Comment.Text>{message.body}</Comment.Text>
    </Comment.Content>
  </Comment>
);

export default Message;
