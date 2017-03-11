import { findChat } from '../services/api';

export function chatWithLink(link) {
  return async (dispatch) => {
    dispatch({
      type: 'CHAT_SEARCH_REQUESTED',
      link
    });

    try {
      const chat = await findChat(link);
      dispatch({
        type: 'CHAT_SEARCH_SUCCEEDED',
        chat
      });
    } catch(error) {
      dispatch({
        type: 'CHAT_SEARCH_ERROR',
        error
      });
    }
  }
}
