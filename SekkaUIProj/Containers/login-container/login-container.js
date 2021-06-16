import { Label, View, Textarea, Text, Input, Container, Header, Content, Form, Item, Button } from "native-base"
import React, { useState } from "react";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import { LoginAction } from "../../redux/action/authentication-actions"

const Login = (props) => {

    let [userName, setUserName] = useState();
    let [password, setPassword] = useState();

    return (
        <Container>
            <Content style={{ width: '90%', alignContent: "center", marginLeft: '5%' }}>
                <Form>
                    <Item floatingLabel>
                        <Label>Username</Label>
                        <Input value={userName}
                            onChangeText={(txt) => {
                                setUserName(txt);
                            }} />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Password</Label>
                        <Input value={password}
                            onChangeText={(txt) => {
                                setPassword(txt);
                            }} />
                    </Item>
                    <View style={{ marginTop: "10%" }}>
                        <Button primary block ><Text>Login</Text></Button>
                    </View>
                </Form>
                <Text style={{ color: 'blue' ,marginTop:'3%'}}
                    onPress={() =>props.navigation.replace("Register")
                }>
                    You don't have an account? Register now
                </Text>
            </Content>
        </Container>

    )
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