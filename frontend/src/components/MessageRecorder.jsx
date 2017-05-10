import React, { Component } from 'react';
import { Container, Button, Form } from 'semantic-ui-react';
import { AudioPreview } from './AudioPlayer';

// TODO use prview component, use redux for stop/start recording
class MessageRecorder extends Component {
  constructor(props) {
    super(props);
    this.chatId = props.chatId;
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.send = this.send.bind(this);
    this.toggleTextField = this.toggleTextField.bind(this);

    this.state = {
      blob: null,
      isRecording: false,
      stream: null,
      analyserData: {data: [], lineTo: 0},
      playing: false,
      pos: 0,
      showTextField: false,
      text: ''
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

  startRecording() {
    this.recorder.start();
    this.setState({isRecording: true});
  }

  stopRecording() {
    this.recorder.stop();
  }

  send() {
    if (this.state.blob)
      this.props.sendAudioMessage(this.state.blob, this.state.text, this.chatId);
    else
      this.props.sendTextOnlyMessage(this.state.text, this.chatId);
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

  render() {
    const { isRecording, blob } = this.state;

    return (
      <Container>
        {isRecording
          ? (<Button icon='stop circle' onClick={this.stopRecording} primary/>)
          : (<div>
                <Button onClick={this.startRecording} icon='unmute' primary/>
                {(blob)
                  ? (<AudioPreview blob={blob} chatId={this.chatId}/>)
                  : null}
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
            </div>)}
      </Container>);
  }
}

export default MessageRecorder;
