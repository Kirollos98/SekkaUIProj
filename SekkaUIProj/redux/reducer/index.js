import {combineReducers} from 'redux';
import authentication from "./authentication-reducer"
import city from "./city-reducer"

// export default combineReducers({
//     users
// })

export default combineReducers({
    authentication,
    city
})