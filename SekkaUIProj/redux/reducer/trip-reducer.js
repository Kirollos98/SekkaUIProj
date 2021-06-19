export default function searchTrip(state = {}, action) {

  console.log("ana fy el rdeucer ");

  switch (action.type) {
    case 'SearchOperation': {
      console.log(action.payload, 'hena el mdawa5na ');
      return {...state, tripsLIST: action.payload};
    }
    case 'Trip_Details': {
      return {...state, tripDetails: action.payload};
    }
    default: {
      return state;
    }
  }
}
