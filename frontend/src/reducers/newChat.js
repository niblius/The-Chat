function newChat(state = {link: '', title:''}, action) {
  switch (action.type) {
    case 'SET_LINK':
      let newLink = action.link;
      if (newLink.indexOf('@') !== 0) {
        newLink = `@${newLink}`;
      }
      return { link: newLink, title: state.title };
    case 'SET_TITLE':
      return { link: state.link, title: action.title}

    default:
      return state;
  }
}


export default newChat;
