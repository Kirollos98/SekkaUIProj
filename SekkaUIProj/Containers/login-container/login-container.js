import { Label, View, Textarea, Text, Input, Container, Header, Content, Form, Item, Button } from "native-base"
import React, { useState } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import { LoginAction } from "../../redux/action/authentication-actions"

const Login = (props) => {

    let [userName, setUserName] = useState();
    let [password, setPassword] = useState();

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
          <Form>
            <Item floatingLabel>
              <Label style={{color: '#03CFFF'}}>Username</Label>
              <Input
                value={userName}
                onChangeText={(txt) => {
                  setUserName(txt);
                }}
                style={{color: 'white'}}
              />
            </Item>
            <Item floatingLabel last>
              <Label style={{color: '#03CFFF'}}>Password</Label>
              <Input
                secureTextEntry={true}
                value={password}
                onChangeText={(txt) => {
                  setPassword(txt);
                }}
                style={{color: 'white'}}
              />
            </Item>
            <View style={{marginTop: '10%'}}>
              <Button
                style={{backgroundColor: '#03CFFF'}}
                block
                onPress={async () => {
                  let tempObj = {
                    name: userName,
                    password: password,
                  };

                  let response = await LoginAction(tempObj);
                  console.log('response from login ', response);
                  if (response.payload === 'Not Valid') {
                    Alert.alert(response.payload);
                  } else {
                    props.navigation.replace('MainPage');
                  }
                }}
              >
                <Text>Login</Text>
              </Button>
            </View>
          </Form>
          <Text
            style={{color: 'white', marginTop: '3%'}}
            onPress={() => props.navigation.replace('Register')}
          >
            You don't have an account? Register now
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