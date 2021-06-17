export default function authentication(state={},action) {
    switch (action.type){
        case 'loginOperation':{
            return {...state,loggedUser:action.payload}
        }
        case 'registerOperation':{
            return {...state,registeredUser:action.payload}
        }
        case 'logoutOperation':{
            return {...state,message:action.payload}
        }
        default:{
            return state
        }
    }
}
