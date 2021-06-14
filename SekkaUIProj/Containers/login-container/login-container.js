import { Label, View,Textarea ,Text} from "native-base"
import React ,{ useState } from "react";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import {LoginAction} from "../../redux/action/authentication-actions"

const Login = (props)=>{

    let [userName,setUserName] = useState();
    let [password,setPassword] = useState();

    return(
        <View>
            <View>
                <Label>UserName</Label>
                <Textarea
                value={userName}
                onChangeText={(txt)=>{
                    setUserName(txt);
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
        </View>
    )
}

export default connect(
    (state)=>{
        return{
            loggedUser:state.authentication.loggedUser
        }
    },
    (dispatch)=>{
        return bindActionCreators({LoginAction},dispatch)
    }
)(Login)