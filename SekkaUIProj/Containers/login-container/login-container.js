import { Label, View, Textarea, Text, Input, Container, Header, Content, Form, Item, Button } from "native-base"
import React, { useState } from "react";
import { Alert, Image,StyleSheet,TouchableHighlight} from "react-native";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import { LoginAction } from "../../redux/action/authentication-actions"
import LottieView from 'lottie-react-native';
const Login = (props) => {

    let [email, setEmail] = useState();
    let [password, setPassword] = useState();
    var [ isPress, setIsPress ] = React.useState(false);

    var touchProps = {
      activeOpacity: 1,
      underlayColor: '#00a3cc',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
      style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
      onHideUnderlay: () => setIsPress(false),
      onShowUnderlay: () => setIsPress(true),
      onPress: () => console.log('HELLO'),                 // <-- "onPress" is apparently required
    };
    return (
      <Container>
        <Content
          style={{
            width: '90%',
            alignContent: 'center',
            marginLeft: '5%',
            backgroundColor: '#001648',
          }}
        >
        
        <LottieView source={require('../../assets/lottie/login.json')} autoPlay loop style={{width:400,height:400,alignSelf:"center"}}/>          
        <Form style={{marginTop:-70}}>
            <Item floatingLabel last >
              <Label style={{color: '#03CFFF',marginVertical:-5,marginLeft:-15}}>Email</Label>
              <Input
                value={email}
                onChangeText={(txt) => {
                  setEmail(txt);
                }}
                style={{color: 'white'}}
              />
            </Item>
            <Item floatingLabel last>
              <Label style={{color: '#03CFFF',marginVertical:-5,marginLeft:-15}}>Password</Label>
              <Input
                secureTextEntry={true}
                value={password}
                onChangeText={(txt) => {
                  setPassword(txt);
                }}
                style={{color: 'white'}}
              />
            </Item>
            <View style= {styles.container}>
              <TouchableHighlight {...touchProps} 
                
                block
                onPress={async () => {
                  let tempObj = {
                    email: email,
                    password: password,
                  };

                  let response = await LoginAction(tempObj);
                  console.log('response from login ', response);
                  if (response.payload === 'Not Valid') {
                    console.log(
                      'responsssssssssssss from login here 3la fkraaa',
                      response.payload
                    );
                    Alert.alert(
                      'Please try again,'
                       +'Check  your email and  Password'
                    );
                  } else {
                    props.navigation.replace('DrawerNavigator');
                  }
                }}
              >
                <Text style={{fontWeight:"bold",color:"white",alignSelf:"center",textAlignVertical:"center",marginTop:9}}>Login</Text>
              </TouchableHighlight>
            </View>
          </Form>
          <Text style={{fontWeight:"bold",color:"white",alignSelf:"center",textAlignVertical:"center",marginTop:9}}>
            You don't have an account? &nbsp;
            <Text  onPress={() => props.navigation.replace('Register')} style={{color:"#ff0066",textDecorationLine:"underline"}}>Register now</Text> 
          </Text>
      
        </Content>
      </Container>
    );
}

export default connect(
    (state) => {
        return {
            loggedUser: state.authentication.loggedUser
        }
    },
    (dispatch) => {
        return bindActionCreators({ LoginAction }, dispatch)
    }
)(Login)

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