export default function city(state={},action) {
    switch (action.type){
        case 'Cities_LIST':{
            // console.log("gwa reducer", action.payload)
            return {...state,citiesLIST:action.payload}
        }
        default:{
            return state
        }
    }
}