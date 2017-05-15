import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

import Main from './Main.jsx';

function mapStateToProps(state) {
  return {
    searchedChat: state.searchedChat,
    currentUser: state.currentUser,
    chats: state.chats,
    audioPlayer: state.audioPlayer,
    joinOffers: state.joinOffers
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
