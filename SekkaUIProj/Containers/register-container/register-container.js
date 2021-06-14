import { Label, View,Textarea ,Text,Button} from "native-base"
import React ,{ useEffect, useState } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import {RegisterAction} from "../../redux/action/authentication-actions"

Register = (props)=>{

    let [userName,setUserName] = useState();
    let [email,setEmail] = useState();
    let [password,setPassword] = useState();
    let [passwordConfirm,setPasswordConfirm] = useState();//city
    let [city,setCity] = useState();

    // useEffect(()=>{
    //     if(registeredUser){
    //         Alert.alert("Registered Successfully !!",registeredUser.email);
    //     }
    // })


    return(
        <View>
            <View>
                <Label>Name</Label>
                <Textarea
                value={userName}
                onChangeText={(txt)=>{
                    setUserName(txt);
                }}></Textarea>
            </View>
            <View>
                <Label>email</Label>
                <Textarea
                value={email}
                onChangeText={(txt)=>{
                    setEmail(txt);
                }}></Textarea>
            </View>
            <View>
                <Label>Password</Label>
                <Textarea
                value={password}
                onChangeText={(txt)=>{
                    setPassword(txt);
                }}></Textarea>
            </View>
            <View>
                <Label>Password Confirmation</Label>
                <Textarea
                value={passwordConfirm}
                onChangeText={(txt)=>{
                    setPasswordConfirm(txt);
                }}></Textarea>
            </View>
            <View>
                <Label>City</Label>
                <Textarea
                value={city}
                onChangeText={(txt)=>{
                    setCity(txt);
                }}></Textarea>
            </View>
            <View>
                <Button onPress={async()=>{
                    let tempObj = {
                        name:userName,
                        password,
                        email,
                        city
                    }
                    await RegisterAction(tempObj)
                    Alert.alert("Registered Successfully !!",registeredUser.email);
                }}><Text>Register</Text></Button>
            </View>
        </View>
    )
}

export default connect(
    (state)=>{
        return{
            registeredUser:state.authentication.registeredUser
        }
    },
    (dispatch)=>{
        return bindActionCreators({RegisterAction},dispatch)
    }
)(Register)