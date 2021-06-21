import { Label, View ,Text,Button,Textarea ,Input,Container, Header, Content, Form, Item} from "native-base"
import React ,{ useEffect, useState } from "react";
import { Alert ,StyleSheet} from "react-native";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import {RegisterAction,LoginAction} from "../../redux/action/authentication-actions"
import LottieView from 'lottie-react-native';
import { TouchableHighlight } from "react-native-gesture-handler";

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
        console.log("gwa useeffect")
        props.navigation.replace("Login");
      }
    }, [registerFlag])
    var [ isPress, setIsPress ] = React.useState(false);

    var touchProps = {
      activeOpacity: 1,
      underlayColor: '#00a3cc',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
      style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
      onHideUnderlay: () => setIsPress(false),
      onShowUnderlay: () => setIsPress(true),
      onPress: () => console.log('HELLO'),                 // <-- "onPress" is apparently required
    };
  
    return(
        <Container>
        
        <Content style={{width:'90%',alignContent:"center",marginLeft:'5%',backgroundColor: '#001648'}}>
        <LottieView source={require('../../assets/lottie/user-profile.json')} autoPlay loop style={{width:250,height:250,alignSelf:"center"}}/>         

          <Form style={{marginTop:-35}}>
            <Item floatingLabel last>
              <Label style={{color: '#03CFFF',marginVertical:-5,marginLeft:-15}}>Username</Label>
              <Input   value={userName}
                onChangeText={(txt)=>{
                    setUserName(txt);
                }}
                style={{color: 'white'}}
                />
            </Item>

            <Item floatingLabel last>
              <Label style={{color: '#03CFFF',marginVertical:-5,marginLeft:-15}}>Email</Label>
              <Input    value={email}
                onChangeText={(txt)=>{
                    setEmail(txt);
                }}
                style={{color: 'white'}}
                />
            </Item>

            <Item floatingLabel last>
              <Label style={{color: '#03CFFF',marginVertical:-5,marginLeft:-15}}>Password</Label>
              <Input secureTextEntry={true} 
                value={password}
                onChangeText={(txt)=>{
                    setPassword(txt);
                }}
                style={{color: 'white'}}
                />
            </Item>

            <Item floatingLabel last>
              <Label style={{color: '#03CFFF',marginVertical:-5,marginLeft:-15}}>Confirm Password</Label>
              <Input secureTextEntry={true} 
                value={passwordConfirm}
                onChangeText={(txt)=>{
                    setPasswordConfirm(txt);
                }}
                style={{color: 'white'}}
                />
            </Item>
            <Item floatingLabel last>
              <Label style={{color: '#03CFFF',marginVertical:-5,marginLeft:-15}}>City</Label>
              <Input value={city}
                onChangeText={(txt)=>{
                    setCity(txt);
                }}
                style={{color: 'white'}}
                />
            </Item>
            <View style= {styles.container}>
            <TouchableHighlight {...touchProps}   block onPress={async()=>{
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
                      x();
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
                   
                }}><Text style={{fontWeight:"bold",color:"white",alignSelf:"center",textAlignVertical:"center",marginTop:9}}>Register</Text></TouchableHighlight>
            
            </View>
            <Text style={{fontWeight:"bold",color:"white",alignSelf:"center",textAlignVertical:"center",marginTop:9}} >
               
                    You already have an account? &nbsp;
                    <Text onPress={() =>props.navigation.replace("Login") }
                    style={{color:"#ff0066",textDecorationLine:"underline"}}> Login</Text>
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
    backgroundColor: '#03CFFF'
  },
  btnPress: {
    borderColor: '#00a3cc',
    borderWidth: 1,
    borderRadius: 25,
    height: 45,
    width: 300,
    backgroundColor: '#00a3cc'
    
  }
});