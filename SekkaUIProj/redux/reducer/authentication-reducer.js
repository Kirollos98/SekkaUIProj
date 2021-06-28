export default function authentication(state={},action) {
    switch (action.type){
        case 'loginOperation':{
            console.log("gow el auth reducer")
            console.log("loggedUser,",action.payload);
            return {...state,loggedUser:action.payload}
        }
        case 'registerOperation':{
            return {...state,registeredUser:action.payload}
        }
        case 'logoutOperation':{
            return {...state,logoutResponse:action.payload}
        }
        default:{
            return state
        }
    }
}
