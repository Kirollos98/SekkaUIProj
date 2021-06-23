import {combineReducers} from 'redux';
import authentication from "./authentication-reducer"
import city from './city-reducer';
import SearchTrip from './trip-reducer';
import payment from './payment-reducer'

// export default combineReducers({
//     users
// })

export default combineReducers({
    authentication,
    city,
    SearchTrip,
    payment
})