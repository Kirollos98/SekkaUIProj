import { StatusBar } from 'expo-status-bar';

import "react-native-gesture-handler";
import React, { useEffect } from 'react';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import promiseMW from 'redux-promise';


import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"
import * as Font from 'expo-font';
import { Container, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';
import rootReducer from "./redux/reducer/index"
import registerContainer from './Containers/register-container/register-container';
import Home from './Components/home-component/home-component';
import loginContainer from './Containers/login-container/login-container';
import mainScreen from './Containers/main-screen-container/main-screen';
import listTripsScreen from './Containers/list-trips/list-trips-screen';
import detailContainer from './Containers/detail-container/detail-container';
import commonTripList from './Containers/Common-trip-list/common-trip-list';
import { StripeContainer } from '@stripe/stripe-react-native';
import StripePayment from './Containers/payment-container/payment-container';

// const createStoreWithMW = applyMiddleware(promiseMW)(createStore)

const Navigator = createStackNavigator();

export default function App() {

  useEffect(() => {
    (async () => await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    }))();
     }, [])

  const createStoreWithMW = applyMiddleware(promiseMW)(createStore)
  return (
    <Provider store={createStoreWithMW(rootReducer)}>
      <NavigationContainer>
        <Navigator.Navigator initialRouteName="Home">
          <Navigator.Screen
            name="Register"
            component={registerContainer}
            options={{
              title: 'Registeration',
              headerTitleStyle: {textAlign: 'center', color: '#03CFFF',marginRight:'20%'},
              headerStyle: {backgroundColor: '#001648'},
              headerTintColor: '#03CFFF',

            }}
          />
          <Navigator.Screen
            name="Payment"
            component={StripePayment}
            options={{
              title: 'Payment',
              headerTitleStyle: { textAlign: 'center', color: '#03CFFF', marginRight: '25%' },
              headerStyle: { backgroundColor: '#001648' },
              headerTintColor: '#03CFFF',

            }}
          />
          <Navigator.Screen
            name="Login"
            component={loginContainer}
            options={{
              title: 'Login',
              headerTitleStyle: {
                textAlign: 'center',
                color: '#03CFFF',
                marginRight:'15%'
              },
              headerStyle: { backgroundColor: '#001648' },
              headerTintColor: '#03CFFF',
            }}
          />
          <Navigator.Screen
            name="Home"
            component={Home}
            options={{
              title: 'SEKKA',
              headerTitleStyle: {
                textAlign: 'center',
                color: '#03CFFF',
                fontSize:25,
                alignSelf:'center'
                // marginRight:'5%'
              },
              headerStyle: { backgroundColor: '#001648' },
            }}
          />
          <Navigator.Screen
            name="MainPage"
            component={mainScreen}
            options={{
              title: 'Home',
              headerTitleStyle: { textAlign: 'center', marginRight: '20%' },
              headerStyle: { backgroundColor: '#001648' },
              headerTintColor: '#03CFFF',
            }}
          />
          <Navigator.Screen
            name="ListTrip"
            component={commonTripList}
            options={{
              title: 'Trips',
              headerTitleStyle: { textAlign: 'center', marginRight: '20%' },
              headerStyle: { backgroundColor: '#001648' },
              headerTintColor: '#03CFFF',
            }}
          />

          <Navigator.Screen
            name="detail"
            component={detailContainer}
            options={{
              title: 'detail',
              headerTitleStyle: { textAlign: 'center', marginRight: '20%' },
              headerStyle: { backgroundColor: '#001648' },
              headerTintColor: '#03CFFF',
            }}
          />
        </Navigator.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
