import { app } from '../store';

export async function findChat(link) {
  const chats = app.service('chats');
  const result = await chats.find({
    query: {
      link
    }
  });

  if(!result) {
    return null;
  }
  return result[0];
}
