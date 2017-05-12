function audioPlayer(state = {
  playingType: 'none',
  audioContext: new window.AudioContext()
}, action) {
  switch (action.type) {
    case 'START_PLAYING':
      return {
        playingType: action.playingType,
        chatId: action.chatId,
        messageId: action.messageId,
        audioContext: state.audioContext
      };

    case 'STOP_PLAYING':
      return {
        playingType: 'none',
        audioContext: state.audioContext
      };

    default:
      return state;
  }
}


export default audioPlayer;
