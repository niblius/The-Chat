import React, { Component } from 'react';
import { Comment, Segment } from 'semantic-ui-react';
import Scroll from 'react-scroll';

import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.scroll = Scroll.animateScroll;
  }

  componentWillMount() {
    Scroll.scrollSpy.update();
  }

  componentDidUpdate() {
    this.scroll.scrollToBottom({
      containerId: 'messages_list',
      duration: 0,
      delay: 0
    });
  }

  componentDidMount() {
    this.scroll.scrollToBottom({
      containerId: 'messages_list',
      duration: 0,
      delay: 0
    });
  }

  render() {
    return (
        <Comment.Group>
          <Segment
            style={{
                marginTop: '0',
                height: '500px',
                overflowY: 'auto',
                whiteSpace: 'nowrap'
              }}
            id='messages_list'>
            {
              // TODO what if user not found in the list? should request for
              this.props.messages.map(
                (m) => Message(m, this.props.users.find((u) => u.id === m.userId))
              )
            }
          </Segment>
        </Comment.Group>
    );
  }
}

export default MessageList;
