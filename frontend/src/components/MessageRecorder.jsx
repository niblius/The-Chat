import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Button, Form, Icon, Grid } from 'semantic-ui-react';
import { AudioPreview } from './AudioPlayer';
import {
  sendAudioMessage,
  sendTextMessage,
  setAutoplayChatId,
  turnAutoplayOff
} from '../actions/actionCreators';

class MRecorder extends Component {
  constructor(props) {
    super(props);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.send = this.send.bind(this);
    this.toggleTextField = this.toggleTextField.bind(this);
    this.toggleAutoplay = this.toggleAutoplay.bind(this);
    this.isAutoplayOn = this.isAutoplayOn.bind(this);
    this.onMouseEnterAutoplay = this.onMouseEnterAutoplay.bind(this);
    this.onMouseLeaveAutoplay = this.onMouseLeaveAutoplay.bind(this);

    this.state = {
      blob: null,
      isRecording: false,
      stream: null,
      analyserData: {data: [], lineTo: 0},
      playing: false,
      pos: 0,
      showTextField: false,
      text: '',
      autoplayIconHover: false
    };
  }

  componentDidMount() {
    if (!window.Recorder.isRecordingSupported()) {
      console.log('Recording is not supported in this browser.');
      return;
    }

    this.recorder = new window.Recorder({
      bitRate: 128*1024,
      encoderSampleRate: 48000,
      encoderPath: '/js/encoderWorker.min.js',
      leaveStreamOpen: true
    });

    this.recorder.addEventListener('dataAvailable', (e) => {
      const blob = new Blob( [e.detail], { type: 'audio/ogg' } );
      this.setState({
        isRecording: false,
        blob
      });
    });

    this.recorder.initStream();
  }

  componentWillUnmount() {
    this.recorder.clearStream();
  }

  toggleAutoplay() {
    if (this.isAutoplayOn())
      this.props.turnAutoplayOff();
    else
      this.props.setAutoplayChatId(this.props.chatId);
  }

  isAutoplayOn() {
    return this.props.audioPlayer.autoplayChatId === this.props.chatId;
  }

  startRecording() {
    this.recorder.start();
    this.setState({isRecording: true});
  }

  stopRecording() {
    this.recorder.stop();
  }

  send() {
    const chatId = this.props.chatId;
    if (this.state.blob)
      this.props.sendAudioMessage(this.state.blob, this.state.text, chatId);
    else
      this.props.sendTextMessage(this.state.text, chatId);
    this.setState({text: '', blob: null, showTextField: false});
  }

  togglePlay() {
    this.setState({
      playing: !this.state.playing
    });
  }

  changePosition(e) {
    this.setState({
      pos: e.originalArgs[0]
    });
  }

  toggleTextField() {
    this.setState({showTextField: !this.state.showTextField});
  }

  onMouseEnterAutoplay() {
    if (!this.state.autoplayIconHover)
      this.setState({autoplayIconHover: true});
  }

  onMouseLeaveAutoplay() {
    if (this.state.autoplayIconHover)
      this.setState({autoplayIconHover: false});
  }

  showIcon

  render() {
    const { isRecording, blob } = this.state;

    return (
      <Container>
        {isRecording
          ? (<Button icon='stop circle' onClick={this.stopRecording} primary/>)
          : (<Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Button onClick={this.startRecording} icon='unmute' primary/>
                  <Button
                    onClick={this.send}
                    content='Send'
                    labelPosition='left'
                    icon='send'
                    primary/>
                  <Button
                    onClick={this.toggleTextField}
                    icon={(this.state.showTextField) ? 'minus' : 'plus'}
                    primary/>
                  {(this.state.showTextField)
                    ? (<Form.TextArea
                        onChange={(e) => this.setState({text: e.target.value})}
                        value={this.state.text}/>)
                    : null}
                </Grid.Column>
                <Grid.Column textAlign='right'>
                  <Icon
                    name='retweet'
                    disabled={!this.isAutoplayOn()}
                    onClick={this.toggleAutoplay}
                    size={(this.state.autoplayIconHover) ? 'large' : null}
                    onMouseEnter={this.onMouseEnterAutoplay}
                    onMouseLeave={this.onMouseLeaveAutoplay}/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column>
                  {(blob)
                    ? (<AudioPreview blob={blob} chatId={this.props.chatId}/>)
                    : null}
                </Grid.Column>
              </Grid.Row>
            </Grid>)}
      </Container>);
  }
}

function mapStateToProps(state) {
  return {
    audioPlayer: state.audioPlayer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    sendAudioMessage,
    sendTextMessage,
    setAutoplayChatId,
    turnAutoplayOff
  }, dispatch);
}

const MessageRecorder = connect(mapStateToProps, mapDispatchToProps)(MRecorder);
export default MessageRecorder;
