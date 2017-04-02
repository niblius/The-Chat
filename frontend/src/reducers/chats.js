function chats(state = new Map(), action) {
  switch (action.type) {
    case "CHATS_RETRIEVE_SUCCEEDED":
      return action.chats;

    default:
      return state;
  }
}


export default chats;
