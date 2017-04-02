import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

class Chat extends Component {
  constructor(props) {
    super(props);

    // requestChat(this.props.currentChatId);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = '';
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.input);
    this.input = '';
  }

  render() {
    const chat = this.props.chats.find((c) => c.id == this.props.currentChatId);
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Your message</label>
          <input
            name='message'
            onChange={(e) => {input = e.target.value}}
            placeholder='Your message...'/>
        </Form.Field>
        <Button type='submit'>Send</Button>
      </Form>
    )
  }
}

export default Chat;
