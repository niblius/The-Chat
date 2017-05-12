import { loadAudioFor, startPlaying } from './actionCreators';

export function onMessageCreated(dispatch, autoplayId) {
  return async (message) => {
    console.log(message);
    dispatch({
      type: 'MESSAGE_RECEIVED',
      message
    });

    if (autoplayId != null && message.chatId === autoplayId) {
      await loadAudioFor(message)(dispatch);
      dispatch(startPlaying('message', message.chatId, message.id));
    }
  };
}
