import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import Wavesurfer from 'react-wavesurfer';
import {
  forcedStartPlaying,
  stopPlaying,
  loadAudioFor,
  finishedPlaying
} from '../actions/actionCreators';

function mapStateToProps(state) {
  return {
    audioPlayer: state.audioPlayer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    forcedStartPlaying,
    stopPlaying,
    loadAudioFor,
    finishedPlaying
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
        this.props.forcedStartPlaying('message', message.chatId, message.id);
      } else {
        this.props.loadAudioFor(message);
        this.props.forcedStartPlaying('message', message.chatId, message.id);
      }
    }
  }

  isPlaying() {
    return this.props.audioPlayer.playingType === 'message' &&
      this.props.audioPlayer.messageId === this.props.message.id;
  }

  render() {
    const blob = this.props.message.blob;
    return (<div>
              {(blob) ? (<Wavesurfer
                          audioFile={blob}
                          pos={this.state.pos}
                          onPosChange={this.changePosition}
                          playing={this.isPlaying()}
                          onReady={() => this.forceUpdate()}
                          onFinish={this.props.finishedPlaying}
                          options={{
                            hideScrollbar: true,
                            height: 50,
                            audioContext: this.props.audioPlayer.audioContext
                          }}/>) : null }
              <Icon
                onClick={this.togglePlay}
                name={this.isPlaying() ? 'stop' : 'play'}
                circular={true}/>
            </div>)
  }
}

class APreview extends Component {
  constructor(props) {
    super(props);
    this.blob = props.blob;
    this.chatId = props.chatId;
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
    if (this.isPlaying()) {
        this.props.stopPlaying();
    } else {
      this.props.forcedStartPlaying('preview', this.chatId);
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
                onFinish={this.props.finishedPlaying}
                options={{
                  hideScrollbar: true,
                  height: 50,
                  audioContext: this.props.audioPlayer.audioContext
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
