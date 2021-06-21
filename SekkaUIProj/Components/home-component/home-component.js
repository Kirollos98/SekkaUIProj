import { Button, View,Container,Content,Text,Picker } from "native-base"
import React from "react"
import {Image} from 'react-native'


const Home = ({navigation})=>{
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
           style={{width: '100%', alignContent:"center" ,margin:"auto"}}
           >
            <Image
            resizeMode="center"
              source={require('../../assets/Group_1917-removebg-preview.png')}
            //   style={{marginLeft:"0%"}}
            />
          </View>
          <View style={{marginTop: '10%'}}>
            <Button
              style={{backgroundColor: '#03CFFF'}}
              block
              onPress={() => {
                navigation.push('Login');
              }}
            >
              <Text>Login</Text>
            </Button>
          </View>
          <View style={{marginTop: '5%'}}>
            <Button
              style={{backgroundColor: '#03CFFF'}}
              block
              onPress={() => {
                navigation.push('Register');
              }}
            >
              <Text>Register</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
}

export default Home