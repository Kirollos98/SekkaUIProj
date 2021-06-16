import { Button, View,Container,Content,Text } from "native-base"
// import {Text} from "react-native"
import React from "react"

const Home = ({navigation})=>{

    return (
        <Container>
        <Content style={{marginTop:'40%',width:'90%',alignContent:"center",marginLeft:'5%'}}>
        
            <View style={{marginTop:"10%"}}>
            <Button primary  block
            onPress={()=>{
                navigation.push("Login");
            }}><Text>Login</Text></Button>
            </View>
            <View style={{marginTop:"5%"}}>
            <Button primary block  onPress={()=>{
                navigation.push("Register");
            }}><Text>Register</Text></Button>
            </View>
        </Content>
      </Container>
        
    )
}

export default Home