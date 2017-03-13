import { findChat } from '../services/api';

export function searchChat(link) {
  return async (dispatch) => {
    dispatch({
      type: 'CHAT_SEARCH_REQUESTED',
      link
    });
    const data = await findChat(link);
    dispatch({
      type: 'CHAT_SEARCH_DONE',
      data
    });
  };
}
