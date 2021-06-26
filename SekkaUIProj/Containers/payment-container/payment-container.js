import { CardField, StripeProvider, useStripe } from "@stripe/stripe-react-native"
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import React, { useEffect, useState } from "react"
import { Button, View, Text } from "native-base";
import { Payment } from "../../redux/action/payment-action"
import { bookTrip } from "../../redux/action/trip-actions"
import { PropertySafetyFilled } from "@ant-design/icons";
import { Alert } from "react-native";
 import LottieView from 'lottie-react-native';


// const StripePayment = (props) => {
//     return (
//         <StripeProvider
//             publishableKey="pk_test_51Ihh3pLQxH57LdTXafmak0NHkx8Mer1DN5Jo8mWRNIJ2jUqQ59j75UzxwJFREObX2bTrRYStwyXwvbRVRl7dyo7T00agOHEZkS"
//             merchantIdentifier="merchant-identifier"
//         >
//             <View>
//                 <StripeForm />
//             </View>
//         </StripeProvider>
//     )
// }



const StripeForm = (props) => {
    const { confirmPayment } = useStripe();
    //let [successFlag,setSuccessFlag] = useState(false);
    useEffect(() => {
        console.log("gow el user Effect");
        console.log("gow el user Effect props", props);
        const resolver = async () => {
            if (props.paymentDetails) {
                console.log("gow el IF");
                await props.Payment(props.paymentDetails.amount);
            } else {
                console.log("magash el action aslun");
            }
        }
        resolver();
    },[])

    const handelPayment = async () => {
        let flag = false;
        console.log(props.clientKey, "key hena ")
        // const { error } = 
        await confirmPayment(props.clientKey.clientSecret, {
            type: "Card",
            billingDetails: {
                email: "kiro.hafez@gmail.com"
            }
        }).then(res=>{
            Alert.alert("Payment Successfull !!");
            flag = true;
        }).catch(err=>{
            Alert.alert("Error", err.message);
        })


        if (flag) {
            let obj = {
                tripId:props.paymentDetails.tripId,
                seats:props.paymentDetails.seats
            }
            await bookTrip(obj);
            props.navigation.push('MainPage');
        }
        else {
            Alert.alert("there is a problem !!");
        }
    }
    return (
      <StripeProvider
        publishableKey="pk_test_51Ihh3pLQxH57LdTXafmak0NHkx8Mer1DN5Jo8mWRNIJ2jUqQ59j75UzxwJFREObX2bTrRYStwyXwvbRVRl7dyo7T00agOHEZkS"
        merchantIdentifier="merchant-identifier"
      >
        <View style={{backgroundColor: '#001648', height: '100%'}}>
          <CardField
            postalCodeEnabled={false}
            style={{
              height: 50,
              width: '90%',
              display: 'flex',
              flexDirection: 'column',
              marginTop: '10%',
              margin: '5%',
            }}
            cardStyle={{borderRadius: 10}}
          />
          <View style={{marginTop: '10%', marginLeft: '37%'}}>
            <Button
              onPress={handelPayment}
              style={{backgroundColor: '#c8e1ff', borderRadius: 7}}
            >
              <Text
                style={{color: '#001648', fontSize: 20, fontWeight: 'bold'}}
              >
                Pay now
              </Text>
            </Button>
          </View>
          <View style={{height: '100%', width: '100%', marginTop: '30%'}}>
            <LottieView
              source={require('../../assets/lottie/payment.json')}
              autoPlay
              loop
              style={{width: 300, height: 300, alignSelf: 'center'}}
            />
          </View>
        </View>
      </StripeProvider>
    );
}

export default connect(
    (state) => {
        // console.log("mapstatetoprops",state.payment.paymentResponse);
        return {
            paymentDetails: state.SearchTrip.paymentDetails,
            clientKey: state.payment.paymentResponse
        }
    },
    (dispatch) => {
       return bindActionCreators({ Payment,bookTrip }, dispatch)
    }
)(StripeForm);

