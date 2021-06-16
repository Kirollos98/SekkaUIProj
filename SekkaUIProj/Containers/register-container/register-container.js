import { Label, View ,Text,Button,Textarea ,Input,Container, Header, Content, Form, Item} from "native-base"
import React ,{ useEffect, useState } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import {RegisterAction,LoginAction} from "../../redux/action/authentication-actions"

Register = (props)=>{

    let [userName,setUserName] = useState();
    let [email,setEmail] = useState();
    let [password,setPassword] = useState();
    let [passwordConfirm,setPasswordConfirm] = useState();//city
    let [city,setCity] = useState();
    let [registerFlag,setRegisterFlag] = useState(false);

    let validForm=()=>{
      if(userName==null||email==null||password==null||passwordConfirm==null||city==null)
      {
        Alert.alert(
          "Incomplete data", "Please fill all data"
          [  { text: "OK", onPress: () => {}} ] )
          return false
      }
      else if(password!=passwordConfirm)
      {
        Alert.alert(
          "Conflict in passwords", "Please enter your password again"
          [  { text: "OK", onPress: () => {}} ] )
          return false
      }
      return true
    }
    // useEffect(()=>{
    //     if(registeredUser){
    //         Alert.alert("Registered Successfully !!",registeredUser.email);
    //     }
    // })
    useEffect(() => {
      if(registerFlag){
        Alert.alert("Registered Successfully !!");
        setUserName("")
        setPassword("")
        setCity("")
        setPasswordConfirm("")
        setEmail("")
        console.log("gwa useeffect")}
    }, [registerFlag])

    return(
        <Container>
        <Content style={{width:'90%',alignContent:"center",marginLeft:'5%'}}>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input   value={userName}
                onChangeText={(txt)=>{
                    setUserName(txt);
                }}/>
            </Item>

            <Item floatingLabel>
              <Label>Email</Label>
              <Input    value={email}
                onChangeText={(txt)=>{
                    setEmail(txt);
                }}/>
            </Item>

            <Item floatingLabel>
              <Label>Password</Label>
              <Input   value={password}
                onChangeText={(txt)=>{
                    setPassword(txt);
                }}/>
            </Item>

            <Item floatingLabel>
              <Label>Confirm Password</Label>
              <Input   value={passwordConfirm}
                onChangeText={(txt)=>{
                    setPasswordConfirm(txt);
                }}/>
            </Item>
            <Item floatingLabel last>
              <Label>City</Label>
              <Input  value={city}
                onChangeText={(txt)=>{
                    setCity(txt);
                }}/>
            </Item>
            <View style={{marginTop:"10%"}}>
            <Button primary  block onPress={async()=>{
                    let tempObj = {
                        name:userName,
                        password,
                        email,
                        city
                    }
                    if(validForm()==true)
                    {
                      console.log("hwaaa");
                     let x= async()=>{ await RegisterAction({name:userName,password:password,
                        email: email,
                        city: city})
                        setRegisterFlag(true)
                      }
                      x()
                      // await RegisterAction({name:userName,password:password,
                      //   email: email,
                      //   city: city})
                        // Alert.alert("Registered Successfully !!",registeredUser.email);
                        // setUserName("")
                        // setPassword("")
                        // setCity("")
                        // setPasswordConfirm("")
                        // setEmail("")
                    }
                    else{

                    }
                   
                }}><Text>Register</Text></Button>
            
            </View>
            <Text style={{ color: 'blue',marginTop:'3%' }}
                    onPress={() =>props.navigation.replace("Login")
                }>
                    You already have an account? Login
                </Text>
          </Form>
        </Content>
      </Container>

       
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