import React from 'react';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import registerContainer from '../../Containers/register-container/register-container';
import loginContainer from '../../Containers/login-container/login-container';
import Home from '../home-component/home-component';
import mainScreen from '../../Containers/main-screen-container/main-screen';
import commonTripList from '../../Containers/Common-trip-list/common-trip-list';
import detailContainer from '../../Containers/detail-container/detail-container';
import StripePayment from '../../Containers/payment-container/payment-container';


const Navigator = createStackNavigator();

const StackNavigatorComponent = ()=>{

  

    return (
      <Navigator.Navigator initialRouteName="MainPage">
        <Navigator.Screen
          name="Payment"
          component={StripePayment}
          options={{
            title: 'Payment',
            headerTitleStyle: {
              textAlign: 'center',
              color: '#03CFFF',
              marginRight: '25%',
              

            },
            headerStyle: {backgroundColor: '#001648'},
            headerTintColor: '#03CFFF',
            headerShown:false
          }}
        />
        <Navigator.Screen
          name="MainPage"
          component={mainScreen}
          options={{
            // title: 'Home',
            // headerTitleStyle: { textAlign: 'center', marginRight: '20%' },
            // headerStyle: { backgroundColor: '#001648' },
            // headerTintColor: '#03CFFF',
            headerShown: false,
          }}
        />
        <Navigator.Screen
          name="ListTrip"
          component={commonTripList}
          options={{
            // title: 'Trips',
            // headerTitleStyle: { textAlign: 'center', marginRight: '20%' },
            // headerStyle: { backgroundColor: '#001648' },
            // headerTintColor: '#03CFFF',
            headerShown: false,
          }}
        />

        <Navigator.Screen
          name="detail"
          component={detailContainer}
          options={{
            // title: 'detail',
            // headerTitleStyle: {textAlign: 'center', marginRight: '20%'},
            // headerStyle: {backgroundColor: '#001648'},
            // headerTintColor: '#03CFFF',
            headerShown: false,
          }}
        />
      </Navigator.Navigator>
    );
}



export default StackNavigatorComponent