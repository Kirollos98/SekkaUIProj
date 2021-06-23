export default function payment(state={},action) {
    switch (action.type){
        case 'payment-response':{
             console.log("gwa payment reducer", action.payload)
            return {...state,paymentResponse:action.payload}
        }
        default:{
            return state
        }
    }
}