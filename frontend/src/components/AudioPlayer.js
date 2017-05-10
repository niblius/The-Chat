import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import Wavesurfer from 'react-wavesurfer';
import {
  startPlaying,
  stopPlaying,
  loadAudioFor
} from '../actions/actionCreators';

// TODO highlight the playing chat.
function mapStateToProps(state) {
  return {
    audioPlayer: state.audioPlayer
  };
}

// TODO should load blob only when pressed play:
//        when pressed play dispact action "request load" and then start playion.

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    startPlaying,
    stopPlaying,
    loadAudioFor
  }, dispatch);
}

// P. S. A bit ugly and repeatable... :()

class AMessage extends Component {
  constructor(props) {
    super(props);
    this.togglePlay = this.togglePlay.bind(this);
    this.changePosition = this.changePosition.bind(this);
    this.state = { pos: 0 };
  }

  changePosition(e) {
    this.setState({
      pos: e.originalArgs[0]
    });
  }

  togglePlay() {
    const message = this.props.message;
    if (this.isPlaying()) {
        this.props.stopPlaying();
    } else {
      if (message.blob) {
        this.props.startPlaying('message', message.chatId, message.id);
      } else {
        this.props.loadAudioFor(message);
      }
    }
  }

  isPlaying() {
    return this.props.audioPlayer.playingType === 'message' &&
      this.props.audioPlayer.messageId === this.props.message.id;
  }

  render() {
    return (<div>
              <Wavesurfer
                audioFile={this.props.message.blob}
                pos={this.state.pos}
                onPosChange={this.changePosition}
                playing={this.isPlaying()}
                options={{
                  hideScrollbar: true,
                  height: 50
                }}/>
              <Icon
                onClick={this.togglePlay}
                name={this.isPlaying() ? 'stop' : 'play'}
                circular={true}/>
            </div>);
  }
}

class APreview extends Component {
  constructor(props) {
    super(props);
    this.blob = props.blob;
    this.chatId = props.chatId;
    this.togglePlay = this.togglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
    this.state = { pos: 0 };
  }

  changePosition(e) {
    this.setState({
      pos: e.originalArgs[0]
    });
  }

  togglePlay() {
    if (this.isPlaying()) {
        this.props.stopPlaying();
    } else {
      this.props.startPlaying('preview', this.chatId);
    }
  }

  isPlaying() {
    return this.props.audioPlayer.playingType === 'preview' &&
      this.props.audioPlayer.chatId === this.chatId;
  }

  render() {
    return (<div>
              <Wavesurfer
                audioFile={this.blob}
                pos={this.state.pos}
                onPosChange={this.changePosition}
                playing={this.isPlaying()}
                options={{
                  hideScrollbar: true,
                  height: 50
                }}/>
              <Icon
                onClick={this.togglePlay}
                name={this.isPlaying() ? 'stop' : 'play'}
                circular={true}/>
            </div>);
  }
}

const AudioMessage = connect(mapStateToProps, mapDispatchToProps)(AMessage);
const AudioPreview = connect(mapStateToProps, mapDispatchToProps)(APreview);

export {AudioMessage, AudioPreview};
