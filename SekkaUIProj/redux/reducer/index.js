import {combineReducers} from 'redux';
import authentication from "./authentication-reducer"
import city from './city-reducer';
import SearchTrip from './trip-reducer';
import payment from './payment-reducer';
import user from './user-reducer';



export default combineReducers({
    authentication,
    city,
    SearchTrip,
    payment,
    user
})