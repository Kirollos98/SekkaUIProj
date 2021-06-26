
export default function User(state = {}, action) {
    switch (action.type) {
        case 'User-Data': {
            //console.log("gwa user reducer", action.payload)
            return { ...state, userData: action.payload }
        }
        case 'User-Data-Edit': {
            // console.log("gwa user reducer", action.payload)
            return { ...state, userDataEditResponse: action.payload }
        }
        case 'Adding-Complain': {
            // console.log("gwa user reducer", action.payload)
            return { ...state, complainResponse: action.payload }
        }
        case 'Adding-Rate': {
            // console.log("gwa user reducer", action.payload)
            return { ...state, rateResponse: action.payload }
        }
        case 'Get-Rate': {
            console.log("gwa user reducer", action.payload)
            return { ...state, rating: action.payload }
        }
        default: {
            return state
        }
    }
}