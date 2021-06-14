export default function authentication(state={},action) {
    switch (action.type){
        case 'loginOperation':{
            return {...state,loggedUser:action.payload}
        }
        case 'registerOperation':{
            return {...state,registeredUser:action.payload}
        }
        default:{
            return state
        }
    } ///sanya w gy 
}
