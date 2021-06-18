export default function searchTrip(state = {}, action) {
  switch (action.type) {
    case 'SearchOperation': {
      return {...state, tripsLIST: action.payload};
    }
    default: {
      return state;
    }
  }
}
