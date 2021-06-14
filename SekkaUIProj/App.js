import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import * as Font from 'expo-font';
import { Container, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';

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


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
