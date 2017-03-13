import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

class SignupPage extends Component {
  constructor(props) {
    super(props);

    this.email = '';
    this.password = '';
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signup(this.email, this.password);
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
        <Button type='submit'>Sign up</Button>
      </Form>
    )
  }
}

export default SignupPage;
