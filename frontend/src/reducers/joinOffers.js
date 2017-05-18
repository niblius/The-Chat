function joinOffers(state = [], action) {
  switch (action.type) {
    case 'JOIN_OFFERS_RETRIEVE_SUCCEEDED':
      return [...state, ...action.offers];
    case 'JOIN_OFFER_REMOVED':
      return state.filter((offer) => offer.id !== action.offer.id);
    default:
      return state;
  }
}

export default joinOffers;
