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

function mapStateToProps(state) {
  return {
    audioPlayer: state.audioPlayer
  };
}

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
    this.onReady = this.onReady.bind(this);
    this.onFinish = this.onFinish.bind(this);
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

  onReady() {
    const message = this.props.message;
    this.props.startPlaying('message', message.chatId, message.id);
  }

  onFinish() {
    this.props.stopPlaying();
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
                          onReady={this.onReady}
                          onFinish={this.onFinish}
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
    this.onFinish = this.onFinish.bind(this);
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
      this.props.startPlaying('preview', this.chatId);
    }
  }

  isPlaying() {
    return this.props.audioPlayer.playingType === 'preview' &&
      this.props.audioPlayer.chatId === this.chatId;
  }

  onFinish() {
    this.props.stopPlaying();
  }

  render() {
    return (<div>
              <Wavesurfer
                audioFile={this.blob}
                pos={this.state.pos}
                onPosChange={this.changePosition}
                playing={this.isPlaying()}
                onFinish={this.onFinish}
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
