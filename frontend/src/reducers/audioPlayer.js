function audioPlayer(state = {playingType: 'none'}, action) {
  switch (action.type) {
    case 'START_PLAYING':
      return {
        playingType: action.playingType,
        chatId: action.chatId,
        messageId: action.messageId
      };

    case 'STOP_PLAYING':
      return {
        playingType: 'none'
      };

    default:
      return state;
  }
}


export default audioPlayer;
