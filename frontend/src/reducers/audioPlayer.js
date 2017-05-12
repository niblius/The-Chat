function audioPlayer(state = {
  playingType: null,
  autoplayChatId: null,
  chatId: null,
  messageId: null,
  autoplayQueue: [],
  audioContext: new window.AudioContext()
}, action) {
  switch (action.type) {
    case 'START_PLAYING':
      if (state.autoplayChatId !== null && state.playingType) {
        // autoplay is turned off when forcedStartPlaying
        return { // add to queue
          ...state,
          autoplayQueue: [...state.autoplayQueue, action.messageId]
        };
      } else {
        return {
          ...state,
          playingType: action.playingType,
          chatId: action.chatId,
          messageId: action.messageId
        };
      }

    case 'FINISHED_PLAYING':
      if (state.autoplayChatId !== null && state.autoplayQueue[0] !== undefined) {
        return {
          ...state,
          playingType: 'message',
          messageId: state.autoplayQueue[0],
          autoplayQueue: state.autoplayQueue.slice(1)
        };
      } else {
        return {
          ...state,
          playingType: null,
          chatId: null,
          messageId: null
        }
      }

    case 'STOP_PLAYING':
      return {
        ...state,
        playingType: null,
        autoplayQueue: [],
        chatId: null,
        autoplayChatId: null
      };

    case 'SET_AUTO_PLAY_CHAT_ID':
      return {
        ...state,
        autoplayChatId: action.chatId,
        autoplayQueue: []
      };

    case 'TURN_AUTO_PLAY_OFF':
      return {
        ...state,
        autoplayQueue: [],
        autoplayChatId: null
      };

    default:
      return state;
  }
}

export default audioPlayer;
