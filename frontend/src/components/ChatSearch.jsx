import React, { Component } from 'react';
import { Input, Card } from 'semantic-ui-react';

// TODO make it a logic component. right now we get data from the App, we should get data directly from the state.
class ChatSearch extends Component {
  render() {
    return (
      <div>
        <Input placeholder='Search...'
          onChange={(event) => this.props.searchChat(event.target.value)} />
        <div>
          {this.props.searchedChat.hasOwnProperty('title') ?
            this.props.searchedChat.title : 'Not found'} {/* big chat card */}
        </div>
      </div>
    );
  }
}

export default ChatSearch;
