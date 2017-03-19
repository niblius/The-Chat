import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { createNewChat, setTitle, setLink } from '../actions/actionCreators';

function mapStateToProps(state) {
  return {
    link: state.newChat.link,
    title: state.newChat.title
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({createNewChat, setTitle, setLink},
    dispatch);
}

class NewChatComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.props.title);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createNewChat(this.props.title, this.props.link);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Title</label>
          <input
            name='title'
            onChange={(e) => this.props.setTitle(e.target.value)}
            value={this.props.title}
            placeholder='Some name for your chat.'/>
        </Form.Field>
        <Form.Field>
          <label>Link</label>
          <input
            name='link'
            value={this.props.link}
            onChange={(e) => this.props.setLink(e.target.value)}
            placeholder='@link_to_my_chat'/>
        </Form.Field>
        <Button type='submit'>Create</Button>
      </Form>
    )
  }
}


const NewChatPage = connect(mapStateToProps, mapDispatchToProps)(NewChatComponent);
export default NewChatPage;
