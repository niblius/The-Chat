import React from 'react';
import { Comment } from 'semantic-ui-react'

const Message = (message, user) => {
  const date = new Date(message.createdAt);
  const yesterday = new Date(Date.now() - 864e5);
  const formattedDate = (date.getTime() < yesterday.getTime()) ?
    `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}` :
    `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return (
      <Comment key={message.id}>
        <Comment.Avatar src={`https://unsplash.it/64/64?image=${user.id}`} />
        <Comment.Content>
          <Comment.Author as='a'>{user.email}</Comment.Author>
          <Comment.Metadata>
            <div>Sent at {formattedDate}</div>
          </Comment.Metadata>
          <Comment.Text>{message.body}</Comment.Text>
        </Comment.Content>
      </Comment>
  );
}
export default Message;
