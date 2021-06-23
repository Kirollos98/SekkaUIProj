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
    case 'Trip-Booking': {
      return {...state, bookedTrip: action.payload};
    }
    case 'Details-Needed': {
      console.log('details gow el reducer ', action.payload);
      return {...state, paymentDetails: action.payload};
    }
    case 'usersTrip': {
      console.log('usersTrip gowa el reducer ', action.payload);
      return {...state, usersTrip: action.payload};
    }
    //
    default: {
      return state;
    }
  }
}
