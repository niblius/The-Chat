import React, { Component } from 'react';
import { Container, Button } from 'semantic-ui-react';
import Wavesurfer from 'react-wavesurfer';

// TODO use prview component, use redux for stop/start recording
class MessageRecorder extends Component {
  constructor(props) {
    super(props);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.send = this.send.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.changePosition = this.changePosition.bind(this);

    this.sendMessage = props.sendMessage;

    this.state = {
      blob: null,
      isRecording: false,
      stream: null,
      analyserData: {data: [], lineTo: 0},
      playing: false,
      pos: 0
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
    this.sendMessage(this.state.blob);
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

  render() {
    const { isRecording, blob } = this.state;

    return (
      <Container>
        {isRecording
          ? (<Button icon='stop circle' onClick={this.stopRecording} primary/>)
          : (<div>
                <Button onClick={this.startRecording} icon='unmute' primary/>
                {(!blob) ? ''
                  : (<div>
                      <Button
                        onClick={this.send}
                        content='Send'
                        labelPosition='left'
                        icon='send'
                        primary/>
                      <Button
                        onClick={this.togglePlay}
                        content='Play'
                        labelPosition='left'
                        icon='play'
                        primary/>
                      <Wavesurfer
                        audioFile={blob}
                        pos={this.state.pos}
                        onPosChange={this.changePosition}
                        playing={this.state.playing}
                        options={{
                          hideScrollbar: true,
                          height: 50
                        }}/>
                    </div>)}
              </div>)}
      </Container>);
  }
}

export default MessageRecorder;
