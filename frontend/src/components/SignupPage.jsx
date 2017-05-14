import React, { Component } from 'react';
import { Form } from 'formsy-semantic-ui-react';
import { Label } from 'semantic-ui-react';

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data, reset, invalidate) {
    this.props.signup(data.email, data.password, invalidate);
  }

  render() {
    return (
      <Form onValidSubmit={this.handleSubmit}>
        <Form.Input
          required
          name='email'
          label='Email'
          validations='isEmail'
          placeholder='example@email.com'
          errorLabel={ <Label color='red' pointing/> }
          validationErrors={{
            isEmail: 'Should be a valid email',
            isDefaultRequiredValue: 'Required',
          }}/>
        <Form.Input
          required
          label='Password'
          name='password'
          placeholder='password'
          type='password'
          errorLabel={ <Label color='red' pointing/> }
          validations={{
            matchRegexp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,30}$/
          }}
          validationErrors={{
            matchRegexp: 'Should be more or equal than 8 symbols in length'
                       + ' and contain at least one lower case'
                       + ' lettter, one upper case letter and one number.'
          }}/>
        <Form.Input
          required
          label='Retype password'
          name='password-ret'
          placeholder='password'
          type='password'
          validations='equalsField:password'/>
        <Form.Button type='submit'>Sign up</Form.Button>
      </Form>
    )
  }
}

export default SignupPage;
