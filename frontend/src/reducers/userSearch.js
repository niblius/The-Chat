function userSearch(state = {}, action) {
  switch (action.type) {
    case 'USER_SEARCH_INITIATED':
      return {result: 'loading'};
    case 'USER_NOT_FOUND':
      return {result: 'not found'}
    case 'USER_FOUND':
      return {result: 'found', foundUser: action.user}
    case 'CLEAR_SEARCH':
      return {};
    default:
      return state;
  }
}

export default userSearch;
