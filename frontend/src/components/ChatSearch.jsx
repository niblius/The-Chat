import React, { Component } from 'react';
import { Input, Card } from 'semantic-ui-react';

class ChatSearch extends Component {
  constructor(props) {
    super(props);
    this.displayChat = this.displayChat.bind(this);
    this.link = '';
    this.join = this.join.bind(this);
  }

  join(e) {
    // redirect when joined successfully
    e.preventDefault();
    this.props.joinChat(this.props.searchedChat.id, this.props.currentUser.data.id);
  }

  displayChat() {
    if (this.props.searchedChat.hasOwnProperty('title')) {
      return (<Card onClick={this.join}>{this.props.searchedChat.title}</Card>); // big chat card
    } else {
      return (<div>NotFound</div>)
    }
  }

  render() {
    return (
      <div>
        <Input placeholder='Search...'
          onChange={(event) => {
            this.link = event.target.value;
            if (this.link)
              this.props.searchChat(this.link)
          }} />
        {this.link ? this.displayChat() : ''}
      </div>
    );
  }
}

export default ChatSearch;
