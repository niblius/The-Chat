import React from 'react';
import { Comment } from 'semantic-ui-react';
import dateFormat from 'dateformat';

import { AudioMessage } from './AudioPlayer';

const Message = (message, user) => {
  const date = new Date(message.createdAt);
  const yesterday = new Date(Date.now() - 864e5);
  const format = (date.getTime() < yesterday.getTime()) ? 'HH:MM' : 'dd/mm';
  const formattedDate = dateFormat(date, format);
  return (
    <Comment key={message.id}>
      <Comment.Avatar src={`https://unsplash.it/64/64?image=${user.id}`} />
      <Comment.Content>
        <Comment.Author as='a'>{user.email}</Comment.Author>
        <Comment.Metadata>
          <div>Sent at {formattedDate}</div>
        </Comment.Metadata>
        <Comment.Text>
          {(message.blobId) ? (<AudioMessage blob={message.blob} message={message}/>) : ''}
          {message.body}
        </Comment.Text>
      </Comment.Content>
    </Comment>
);
}

export default Message;
