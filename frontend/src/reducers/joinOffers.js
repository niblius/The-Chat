function joinOffers(state = [], action) {
  switch (action.type) {
    case 'JOIN_OFFERS_RETRIEVE_SUCCEEDED':
      return [...state, ...action.offers];
    default:
      return state;
  }
}

export default joinOffers;
