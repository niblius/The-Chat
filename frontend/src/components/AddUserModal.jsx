import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Modal, Header, Button, Input, Icon } from 'semantic-ui-react'

import { createJoinOffer, findUser, clearSearch } from '../actions/actionCreators';

function mapStateToProps(state) {
  return {
    userSearch: state.userSearch
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createJoinOffer,
    findUser,
    clearSearch
  }, dispatch);
}

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', loading: false, showConfirm: false};
  }

  isLoading = () => {
    return this.state.email === '' && this.props.userSearch.result === 'loading';
  }

  isError = () => {
    return this.state.email === '' && this.props.userSearch.result === 'not found';
  }

  addUser = () => {
    this.props.clearSearch();
    this.setState({email: '', showConfirm: true})
    // TODO doesn't really confirm LOL. Should be shown on trigger.
    this.props.createJoinOffer(
      this.props.userSearch.foundUser.id, this.props.chatId);
  }

  handleInputChange = (e) => {
    const email = e.target.value;
    clearTimeout(this.state.reqTimeout);
    const reqTimeout = setTimeout(() => {
      this.props.findUser(email);
    }, 300);
    this.setState({reqTimeout, email});
  }

  render() {
    return (
      <Modal
        size='small'
        dimmer={false}
        trigger={this.props.trigger}
        closeIcon={<Icon name='close' color='black'/>}>
        <Header icon='plus' content='Add New User' />
        <Modal.Content>
          <Input
            icon='user'
            name='email'
            label='User email'
            value={this.state.email}
            loading={this.isLoading()}
            onChange={this.handleInputChange}
            error={this.isError()}/>
          {this.state.email
            && this.props.userSearch.foundUser
            && <Button
                  content='Add'
                  icon='plus'
                  color='green'
                  onClick={this.addUser}
                  style={{marginLeft: '5px'}}/>}
          <Confirmation
            open={this.state.showConfirm}
            onOpen={() => this.setState({showConfirm: true})}
            onClose={() => this.setState({showConfirm: false})}/>
        </Modal.Content>
      </Modal>);
  }

}

const Confirmation = ({open, onOpen, onClose}) => {
  return (
    <Modal
      dimmer={false}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      size='small'>
      <Modal.Header>Success!</Modal.Header>
      <Modal.Content>
        <p>Join offer was sent to the user!</p>
      </Modal.Content>
      <Modal.Actions>
        <Button icon='check' content='All Done' onClick={onClose} />
      </Modal.Actions>
    </Modal>
  )
}


const AddUserModal = connect(mapStateToProps, mapDispatchToProps)(AddUser);
export default AddUserModal;
