import React, { Component } from 'react';
import { Form } from 'formsy-semantic-ui-react';
import { Label } from 'semantic-ui-react';

class ChatNewPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onLinkChange = this.onLinkChange.bind(this);
    this.state = {link: ''};
  }

  handleSubmit(data, reset, invalidate) {
    this.props.createNewChat(data.title, data.link, invalidate);
  }

  onLinkChange(e) {
    let link = e.currentTarget.value;
    if (link.length && link.indexOf('@') !== 0) {
      link = `@${link}`;
    }
    this.setState({ link });
  }

  render() {
    return (
      <Form onValidSubmit={this.handleSubmit}>
        <Form.Field>
          <Form.Input
            required
            label='Title'
            name='title'
            validations='maxLength:60'
            value={this.props.title}
            placeholder='Some name for your chat.'
            errorLabel={ <Label color='red' pointing/> }
            validationErrors={{
              maxLength: 'The maximum length is 60 characters',
              isDefaultRequiredValue: 'Title is required'
            }}/>
        </Form.Field>
        <Form.Field>
          <Form.Input
            label='Link'
            name='link'
            value={this.state.link}
            onChange={this.onLinkChange}
            placeholder='@link_to_my_chat'
            errorLabel={ <Label color='red' pointing/> }
            validations={{
              minLength: 4,
              maxLength: 32,
              matchRegexp: /^@[a-z0-9_]+$/i
            }}
            validationErrors={{
              matchRegexp: 'Only letters, numbers, lower dashes and leading @ are allowed.',
              minLength: 'The minimum length is 4 characters',
              maxLength: 'The maximum length is 32 chracters'
            }}/>
        </Form.Field>
        <Form.Button type='submit'>Create</Form.Button>
      </Form>
    )
  }
}

export default ChatNewPage;
