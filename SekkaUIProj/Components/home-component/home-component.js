import { Button, View,Container,Content,Text,Picker } from "native-base"
import React from "react"
import {Image,TouchableHighlight,StyleSheet} from 'react-native'

const Home = ({navigation})=>{
  var [ isPress, setIsPress ] = React.useState(false);
  var [ isPress2, setIsPress2] = React.useState(false);
var touchProps = {
  activeOpacity: 1,
  underlayColor: '#00a3cc',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
  style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
  onHideUnderlay: () => setIsPress(false),
  onShowUnderlay: () => setIsPress(true),
  onPress: () => console.log('HELLO'),                 // <-- "onPress" is apparently required
};
var touchProps2 = {
  activeOpacity: 1,
  underlayColor: '#00a3cc',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
  style: isPress2 ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
  onHideUnderlay: () => setIsPress2(false),
  onShowUnderlay: () => setIsPress2(true),
  onPress: () => console.log('HELLO'),                 // <-- "onPress" is apparently required
};
    return (
      <Container>
        <Content
          style={{
            //marginTop: '40%',
            width: '90%',
            alignContent: 'center',
            marginLeft: '5%',
            backgroundColor: '#001648',
            height:"100%"
          }}
        >
          <View
           style={{width: '100%', alignContent:"center" }}
           >
            <Image
            
            resizeMode="center"
              source={require('../../assets/Group_1917-removebg-preview.png')}
               style={{alignSelf:"center",marginVertical:-40}}
            />
          </View>
          <View >
            <TouchableHighlight {...touchProps} 
              block
              onPress={() => {
                navigation.push('Login');
              }}
            >
              <Text style={{fontWeight:"bold",color:"white",alignSelf:"center",textAlignVertical:"center",marginTop:9}}>Login</Text>
            </TouchableHighlight>
          </View>
          <View style={{marginTop: '5%'}}>
            < TouchableHighlight   {...touchProps2} 
             
              block
              onPress={() => {
                navigation.push('Register');
              }}
            >
              <Text style={{fontWeight:"bold",color:"white",alignSelf:"center",textAlignVertical:"center",marginTop:9}}>Register</Text>
            </ TouchableHighlight>
          </View>
        </Content>
      </Container>
    );
}

export default Home

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:"5%",
    textAlignVertical:"center",
    width:"100%"
  },
  btnNormal: {
    borderColor: '#03CFFF',
    borderWidth: 1,
    borderRadius: 25,
    height: 45,
    width: 300,
    backgroundColor: '#03CFFF',
    alignSelf:"center"
  },
  btnPress: {
    borderColor: '#00a3cc',
    borderWidth: 1,
    borderRadius: 25,
    height: 45,
    width: 300,
    backgroundColor: '#00a3cc',
    alignSelf:"center"
    
  }
});