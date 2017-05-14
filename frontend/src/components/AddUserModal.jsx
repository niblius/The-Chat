import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Modal, Header, Button, Input } from 'semantic-ui-react'

import { createJoinOffer, findUser } from '../actions/actionCreators';

function mapStateToProps(state) {
  return {
    userSearch: state.userSearch
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createJoinOffer,
    findUser
  }, dispatch);
}

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', loading: false};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  addUser = () => {
    this.props.createJoinOffer(this.props.foundUser.id, this.props.chatId);
  }

  handleInputChange(e) {
    const username = e.target.value;
    clearTimeout(this.state.reqTimeout);
    const reqTimeout = setTimeout(() => {
      this.props.findUser(username);
    }, 300);
    this.setState({reqTimeout, username});
  }

  render() {
    return (
      <Modal
        size='small'
        dimmer='blurring'
        trigger={this.props.trigger}
        closeIcon='close'>
        <Header icon='plus' content='Add New User' />
        <Modal.Content>
          <Input
            icon='user'
            label='User email'
            loading={this.state.username && this.props.userSearch.result === 'loading'}
            onChange={this.handleInputChange}
            error={this.state.username && this.props.userSearch.result === 'not found'}/>
          {this.props.userSearch.foundUser
            && <Button content='Add' icon='plus' color='green' onClick={this.addUser}/>}
        </Modal.Content>
      </Modal>);
  }

}


const AddUserModal = connect(mapStateToProps, mapDispatchToProps)(AddUser);
export default AddUserModal;
