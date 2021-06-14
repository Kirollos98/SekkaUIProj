import { StatusBar } from 'expo-status-bar';

import "react-native-gesture-handler";
import React, { useEffect } from 'react';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux';
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

// const createStoreWithMW = applyMiddleware(promiseMW)(createStore)

const Navigator = createStackNavigator();

export default function App() {

  useEffect(()=>{
    loadFont = async()=>{
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
    }

    loadFont();
  },[]);

  const createStoreWithMW = applyMiddleware(promiseMW)(createStore)
  return (
    <Provider store={createStoreWithMW(rootReducer)}>
      <NavigationContainer>
        <Navigator.Navigator
        initialRouteName="Home">
        <Navigator.Screen
          name="Register"
          component={registerContainer}
          options={{
              title:"Registeration",
              headerTitleStyle: { textAlign: 'center' }
            }}
          />
          <Navigator.Screen
          name="Login"
          component={loginContainer}
          options={{
              title:"Login",
              headerTitleStyle: { textAlign: 'center' }
            }}
          />
          <Navigator.Screen
          name="Home"
          component={Home}
          options={{
              title:"Home",
              headerTitleStyle: { textAlign: 'center' }
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
