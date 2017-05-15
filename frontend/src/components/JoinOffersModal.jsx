import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react'
import { Modal, Button, Icon, List } from 'semantic-ui-react'
import dateFormat from 'dateformat';

import { joinChat, removeJoinOffers } from '../actions/actionCreators';

function mapStateToProps(state) {
  return {
    offers: state.joinOffers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({joinChat, removeJoinOffers}, dispatch);
}

class JoinOffersComponent extends Component {
  accept = (offer) => {
    return () => this.props.joinChat(offer.chatId);
  }

  decline = (offer) => {
    return () => this.props.removeJoinOffers(offer.chatId, offer.userId);
  }

  render() {
    return (
      <Modal
        open={this.props.open}
        onOpen={this.props.onOpen}
        onClose={this.props.onClose}
        dimmer={false}
        size='small'
        closeIcon={<Icon name='close' color='black'/>}>
        <Modal.Header>Invites</Modal.Header>
        <Modal.Content>
          <List divided verticalAlign='middle'>
            {this.props.offers.map((offer) => (
              <List.Item key={offer.id}>
                <List.Content floated='right'>
                  <Button onClick={this.accept(offer)} color='green'>Accept</Button>
                  <Button onClick={this.decline(offer)} color='red'>Decline</Button>
                </List.Content>
                {/*<Image avatar src='/assets/images/avatar/small/lena.png' />*/}
                <List.Content>
                  <List.Header>
                    {offer.chat.title}
                  </List.Header>
                  <List.Description>
                    Issued by {offer.issuedBy.email} at {dateFormat(
                                                          offer.createdAt, 'hh:MM dddd, mmmm dS, yyyy')}
                  </List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Modal.Content>
      </Modal>
    );
  }
}

const JoinOffersModal = connect(mapStateToProps, mapDispatchToProps)(JoinOffersComponent);

export default JoinOffersModal;
