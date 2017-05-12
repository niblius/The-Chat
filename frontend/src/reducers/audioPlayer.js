function audioPlayer(state = {
  playingType: 'none',
  autoplayChatId: null,
  audioContext: new window.AudioContext()
}, action) {
  switch (action.type) {
    case 'START_PLAYING':
      return {
        ...state,
        playingType: action.playingType,
        chatId: action.chatId,
        messageId: action.messageId
      };

    case 'STOP_PLAYING':
      return {
        ...state,
        playingType: 'none'
      };

    case 'SET_AUTO_PLAY_CHAT_ID':
      return {
        ...state,
        autoplayChatId: action.chatId
      };

    case 'TURN_AUTO_PLAY_OFF':
      return {
        ...state,
        autoplayChatId: null
      };

    default:
      return state;
  }
}


export default audioPlayer;
