import React, { Component } from 'react';
import { Container, Button } from 'semantic-ui-react';
import Recorder from 'recorder-js';
import WaveStream from 'react-wave-stream';

class MessageRecorder extends Component {
  constructor(props) {
    super(props);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.download = this.download.bind(this);
    this.send = this.send.bind(this);

    this.audioContext =  new (window.AudioContext || window.webkitAudioContext)();
    this.recorder = new Recorder(this.audioContext, {
      onAnalysed: data => this.setState({analyserData: data}),
    });
    this.sendMessage = props.sendMessage;

    this.state = {
      blob: null,
      isRecording: false,
      stream: null,
      analyserData: {data: [], lineTo: 0},
    };
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({audio: true})
      .then(stream => {
        this.setState({stream});
        this.recorder.init(stream);
      })
      .catch(err => console.log('Uh oh... unable to get stream...', err));
  }

  startRecording() {
    this.recorder.start()
      .then(() => this.setState({isRecording: true}));
  }

  stopRecording() {
    this.recorder.stop()
      .then(({blob}) => this.setState({
        isRecording: false,
        blob,
      }));
  }

  download() {
    Recorder.download(this.state.blob, 'audio-message');
    this.setState({blob: null});
  }

  send() {
    this.sendMessage(this.state.blob);
  }

  render() {
    const { isRecording, blob } = this.state;

    return (
      <Container>
        {isRecording
          ? (
            <div>
              <Button icon='stop circle' onClick={this.stopRecording} primary/>
              <div style={{height: '150px', width: '150px', position: 'relative'}}>
                <WaveStream {...this.state.analyserData}
                  backgroundColor='#fff'
                  stroke='#000'/>
              </div>
            </div>
          )
          : (
            <div>
              <Button onClick={this.startRecording} icon='unmute' primary/>
              {(!blob) ? '' : (<Button onClick={this.download} icon='download' primary/>)}
              <Button onClick={this.send} content='Send' labelPosition='left' icon='send' primary/>
            </div>
          )}
      </Container>
    );
  }
}

export default MessageRecorder;
