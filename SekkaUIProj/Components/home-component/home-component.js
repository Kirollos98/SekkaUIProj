import { Button, View } from "native-base"
import {Text} from "react-native"
import React from "react"

const Home = ({navigation})=>{

    return (
        <View>
            <Button 
            onPress={()=>{
                navigation.push("Login");
            }}><Text>Login</Text></Button>
            <Button onPress={()=>{
                navigation.push("Register");
            }}><Text>Register</Text></Button>
        </View>
    )
}

export default Home