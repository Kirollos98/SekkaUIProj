import React, { Component } from "react";
import { Alert, StyleSheet } from "react-native";
import { Label, View, Text, Button, Textarea, Input, Container, Header, Content, Form, Item, Picker, Icon } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserData,editUserData } from '../../redux/action/user-action';
import { getCitiesInProfile } from '../../redux/action/authentication-actions';
import { TouchableHighlight } from "react-native-gesture-handler";


class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            city: '',
            saveFlag: false,
            isEditPress: true,
        };
    }

    async componentDidMount() {
        console.log("ComponentDidMount !!!",this.props);
        await this.props.getUserData();
        this.setState({
            userName: this.props.UserData.name,
            email: this.props.UserData.email,
            city: this.props.UserData.city,
        })
        console.log("ComponentDidMount !!! 2");
        await this.props.getCitiesInProfile();
        console.log("ComponentDidMount !!! 3");
        
    }


    validForm = () => {
        if (
            this.state.userName == null ||
            this.state.city == null ||
            this.state.userName == '' ||
            this.state.city == '' ||
            this.state.city == 'city'
        ) {
            Alert.alert(
                'Incomplete data',
                'Please fill all data'[{ text: 'OK', onPress: () => { } }]
            );
            return false;
        } 
        return true;
    };



    renderCities(ReciviedCities) {
        console.log('renderrrrrrrrrrrrr');
        console.log(ReciviedCities);
        if (ReciviedCities) {
            let x = [];
            ReciviedCities.forEach((element) => {
                x.push(element.cityName);
            });

            return x.map((s, i) => {
                return (
                    <Picker.Item
                        key={i}
                        value={s}
                        label={s}
                        //pickerStyleType={{color: '#c8e1ff'}}
                        style={{ flex: 1, color: '#c8e1ff' }}
                    // theme={{color: {primary: '#c8e1ff'}}}
                    />
                );
            });
        } else {
            return <Text>No City</Text>;
        }
    }

    btnsRendering = () => {
        if (this.state.isEditPress) {
            return (
                <View style={{ alignSelf: "flex-end", marginTop: "5%",right:0 }}>
                    <Button 
                    iconRight 
                    style={{ backgroundColor: "#c8e1ff" }}
                    onPress={()=>{
                        this.setState({isEditPress:false});
                    }}
                    ><Icon style={{ marginLeft: "3%", color: "#001648" }} name="pencil"></Icon><Text style={{ color: "#001648", fontSize: 15, fontWeight: "bold" }}>Edit</Text></Button>
                </View>
            )
        } else {
            return (
                <View style={{ alignSelf: "flex-start", marginTop: "5%", flex: 2 }}>
                    <Button 
                    iconRight 
                    style={{ backgroundColor: "#03CFFF" }}
                    onPress={async ()=>{
                        let obj = {
                            name:this.state.userName,
                            city:this.state.city,
                            email:this.state.email
                        }
                        await this.props.editUserData(obj);
                        this.setState({isEditPress:true});

                    }}
                    ><Icon style={{ marginLeft: "3%", color: "#001648" }} name="save"></Icon><Text style={{ color: "#001648", fontSize: 15, fontWeight: "bold" }}>Save</Text></Button>
                </View>
            )
        }
    }

    render() {
        var touchProps = {
            activeOpacity: 1,
            underlayColor: '#00a3cc', // <-- "backgroundColor" will be always overwritten by "underlayColor"
            style: this.state.isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
            onHideUnderlay: () => this.setState({ isPress: false }),
            onShowUnderlay: () => this.setState({ isPress: true }),
            onPress: () => console.log('HELLO'), // <-- "onPress" is apparently required
        };

        const cityInput = () => (
            //<View style={styles.container}>
            <Picker
                enabled={!this.state.isEditPress}
                selectedValue={this.state.city}
                style={{ height: 50, width: '100%', color: '#03CFFF', marginLeft: -15 }}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({ city: itemValue })
                }
            >
                {this.renderCities(this.props.ReciviedCities)}
            </Picker>
            // </View>
        );
        return (
            <View style={{
                width: '100%',
                alignContent: 'center',
                height: '100%',
                backgroundColor: '#001648',
            }}>
                <Container
                    style={{
                        marginTop: "20%",
                        width: '90%',
                        alignContent: 'center',
                        marginLeft: '5%',
                        backgroundColor: '#001648',
                    }}
                >


                    <Form style={{ marginTop: -35 }}>


                        <Item floatingLabel last>
                            <Label
                                style={{ color: '#03CFFF', marginVertical: -5, marginLeft: -15 }}
                            >
                                Email
                            </Label>
                            <Input
                                disabled={true}
                                value={this.state.email}
                                onChangeText={(txt) => {
                                    this.setState({ email: txt });
                                }}
                                style={{ color: 'white' }}
                            />
                        </Item>

                        <Item floatingLabel last>
                            <Label
                                style={{ color: '#03CFFF', marginVertical: -5, marginLeft: -15 }}
                            >
                                Username
                            </Label>
                            <Input
                                disabled={this.state.isEditPress}
                                value={this.state.userName}
                                onChangeText={(txt) => {
                                    this.setState({ userName: txt });
                                }}
                                style={{ color: 'white' }}
                            />
                        </Item>



                        <Item last>

                            {cityInput()}

                        </Item>
                        

                            {this.btnsRendering()}
                        
                    </Form>
                </Container>

            </View>
        )
    }
}

export default connect(
    (state) => {
        console.log("state in profile----------------------------", state)
        return {
            UserData: state.user.userData,
            ReciviedCities: state.city.citiesLISTProfile
        }
    },
    (dispatch) => {
        return bindActionCreators({ getUserData, getCitiesInProfile,editUserData }, dispatch);
    }
)(UserProfile)


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "5%",
        textAlignVertical: "center",
        width: "100%"
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