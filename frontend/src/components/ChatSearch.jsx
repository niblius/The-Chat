import React, { Component } from 'react';
import { Input, Card } from 'semantic-ui-react';

import chatWithLink from '../actions/actionCreators';

function ChatSearch() {
  console.log(this.props);
  return (
    <div>
      <Input placeholder='Search...' onChange={(event) => {
          chatWithLink(event.target.value);
        }} />
      <Card>

      </Card>
    </div>
  );
}

export default ChatSearch;
