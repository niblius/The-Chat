import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.email = '';
    this.password = '';
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.email, this.password, this.props.location.query.next || '');
    this.email = '';
    this.password = '';
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Email</label>
          <input
            name='email'
            onChange={(e) => {this.email = e.target.value}}
            placeholder='Email'/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            name='password'
            onChange={(e) => this.password = e.target.value}
            placeholder='Password'
            type='password'/>
        </Form.Field>
        <Button type='submit'>Login</Button>
      </Form>
    )
  }
}

export default LoginPage;
