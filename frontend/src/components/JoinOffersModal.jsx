import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react'
import { Modal, Button, Icon, List } from 'semantic-ui-react'
import dateFormat from 'dateformat';

import { joinChat, removeJoinOffer } from '../actions/actionCreators';

function mapStateToProps(state) {
  return {
    offers: state.joinOffers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({joinChat, removeJoinOffer}, dispatch);
}

function JoinOfferItem({offer, onAccept, onRemove}) {
  const date = dateFormat(offer.createdAt, 'hh:MM dddd, mmmm dS, yyyy');
  return (
  <List.Item>
    <List.Content floated='right'>
      <Button onClick={onAccept} color='green'>
        Accept
      </Button>
      <Button onClick={onRemove} color='red'>
        Decline
      </Button>
    </List.Content>
    {/*<Image avatar src='/assets/images/avatar/small/lena.png' />*/}
    <List.Content>
      <List.Header>
        {offer.chat.title}
      </List.Header>
      <List.Description>
        Issued by {offer.issuedBy.email} at {date}
      </List.Description>
    </List.Content>
  </List.Item>);
}

class JoinOffersComponent extends Component {
  accept = (chatId) => {
    return () => this.props.joinChat(chatId);
  }

  decline = (offerId) => {
    return () => this.props.removeJoinOffer(offerId);
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
            {this.props.offers.map((offer) => {
              return (<JoinOfferItem
                        key={offer.id}
                        offer={offer}
                        onAccept={this.accept(offer.chatId) }
                        onRemove={this.decline(offer.id)}/>)
            })}
          </List>
        </Modal.Content>
      </Modal>
    );
  }
}

const JoinOffersModal = connect(mapStateToProps, mapDispatchToProps)(JoinOffersComponent);

export default JoinOffersModal;
