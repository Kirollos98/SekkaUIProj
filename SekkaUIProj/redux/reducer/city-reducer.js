export default function city(state={},action) {
    switch (action.type){
        case 'Cities_LIST_Register':{
             console.log("gwa reducer city", action.payload)
            return {...state,citiesLIST:action.payload}
        }
        case 'Cities_LIST_Home':{
            // console.log("gwa reducer", action.payload)
            return {...state,citiesLISTHome:action.payload}
        }//
        case 'Cities_LIST_Profile':{
            // console.log("gwa reducer", action.payload)
            return {...state,citiesLISTProfile:action.payload}
        }
        default:{
            return state
        }
    }
}