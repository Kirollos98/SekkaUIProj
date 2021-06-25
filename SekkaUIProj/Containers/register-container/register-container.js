import {
  Label,
  View,
  Text,
  Button,
  Textarea,
  Input,
  Container,
  Header,
  Content,
  Form,
  Item,
  Picker,
} from 'native-base';
import React ,{ Component } from "react";
import { Alert ,StyleSheet} from "react-native";
import { connect } from "react-redux"

import { bindActionCreators } from "redux";
import {
  RegisterAction,
  LoginAction,
  getCities,
} from '../../redux/action/authentication-actions';
import LottieView from 'lottie-react-native';
import { TouchableHighlight } from "react-native-gesture-handler";




class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      city: '',
      registerFlag: false,
      isPress: false,
    };
  }
  validForm = () => {
    if (
      this.state.userName == null ||
      this.state.email == null ||
      this.state.password == null ||
      this.state.passwordConfirm == null ||
      this.state.city == null ||
      this.state.userName == '' ||
      this.state.email == '' ||
      this.state.password == '' ||
      this.state.passwordConfirm == '' ||
      this.state.city == '' ||
      this.state.city == 'city'
    ) {
      Alert.alert(
        'Incomplete data',
        'Please fill all data'[{text: 'OK', onPress: () => {}}]
      );
      return false;
    }else if (this.validate() === false) {
      Alert.alert(
        'Email is not valid ',
        'Please enter your email again'[{text: 'OK', onPress: () => {}}]
      );
      return false;
    }else if (this.state.password != this.state.passwordConfirm) {
      Alert.alert(
        'Conflict in passwords',
        'Please enter your password again'[{text: 'OK', onPress: () => {}}]
      );
      return false;
    }  return true;
  };

  async componentDidMount() {
    await this.props.getCities(false);

    if (this.state.registerFlag) {
      Alert.alert('Registered Successfully !!');

      this.setState({
        userName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        city: '',
      });

      console.log('gwa useeffect');
      this.props.navigation.replace('Login');
    }
  }
  validate = () => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(this.state.email) === false) {
      console.log('Email is Not Correct');
      //this.setState({email: text});
      return false;
    } 
    else {
      //this.setState({email: text});
      console.log('Email is Correct');
      return true;
    
    }
  };
  render() {
    var touchProps = {
      activeOpacity: 1,
      underlayColor: '#00a3cc', // <-- "backgroundColor" will be always overwritten by "underlayColor"
      style: this.state.isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
      onHideUnderlay: () => this.setState({isPress: false}),
      onShowUnderlay: () => this.setState({isPress: true}),
      onPress: () => console.log('HELLO'), // <-- "onPress" is apparently required
    };
    const cityInput = () => (
      //<View style={styles.container}>
      <Picker
        selectedValue={this.state.city}
        style={{height: 50, width: '100%', color: '#03CFFF', marginLeft: -15}}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({city: itemValue})
        }
      >
        <Picker.Item label="City" value="" />
        {this.renderCities(this.props)}
      </Picker>
      // </View>
    );
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
          <LottieView
            source={require('../../assets/lottie/user-profile.json')}
            autoPlay
            loop
            style={{width: 250, height: 250, alignSelf: 'center'}}
          />

          <Form style={{marginTop: -35}}>
            <Item floatingLabel last>
              <Label
                style={{color: '#03CFFF', marginVertical: -5, marginLeft: -15}}
              >
                Username
              </Label>
              <Input
                value={this.state.userName}
                onChangeText={(txt) => {
                  this.setState({userName: txt});
                }}
                style={{color: 'white'}}
              />
            </Item>

            <Item floatingLabel last>
              <Label
                style={{color: '#03CFFF', marginVertical: -5, marginLeft: -15}}
              >
                Email
              </Label>
              <Input
                value={this.state.email}
                onChangeText={(txt) => {
                  this.setState({email: txt});
                }}
                style={{color: 'white'}}
              />
            </Item>

            <Item floatingLabel last>
              <Label
                style={{color: '#03CFFF', marginVertical: -5, marginLeft: -15}}
              >
                Password
              </Label>
              <Input
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(txt) => {
                  this.setState({password: txt});
                }}
                style={{color: 'white'}}
              />
            </Item>

            <Item floatingLabel last>
              <Label
                style={{color: '#03CFFF', marginVertical: -5, marginLeft: -15}}
              >
                Confirm Password
              </Label>
              <Input
                secureTextEntry={true}
                value={this.state.passwordConfirm}
                onChangeText={(txt) => {
                  this.setState({passwordConfirm: txt});
                }}
                style={{color: 'white'}}
              />
            </Item>
            <Item last>
              {/* <Label
                style={{color: '#03CFFF', marginVertical: -5, marginLeft: -15}}
              >
                City
              </Label> */}
              {cityInput()}
              {/* <Input
                value={this.state.city}
                onChangeText={(txt) => {
                this.setState({city: txt});

                }}
                style={{color: 'white'}}
              /> */}
              {/* <View style={styles.container}>
                <Picker
                  selectedValue={this.state.city}
                  style={{height: 50, width: '90%', marginLeft: '10%'}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({city: itemValue})
                  }
                >
                  <Picker.Item label="City" value="" />
                  {this.renderCities(this.props)}
                </Picker>
              </View> */}
            </Item>
            <View style={styles.container}>
              <TouchableHighlight
                {...touchProps}
                block
                onPress={async () => {
                  let tempObj = {
                    name: this.state.userName,
                    password: this.state.password,
                    email: this.state.email,
                    city: this.state.city,
                  };
                  if (this.validForm() == true) {
                    console.log('hwaaa');
                    let validRegister;

                    let x = async () => {
                     validRegister= await RegisterAction({
                        name: this.state.userName,
                        password: this.state.password,
                        email: this.state.email,
                        city: this.state.city,
                      });
                      console.log('validRegister', validRegister );
                      if (validRegister.payload == false){

                          Alert.alert("Please enter a unique email");
                      }else{
                       this.setState({RegisterFlag: true});

                      this.props.navigation.replace('Login');

                      }
                      
                    };
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
                  } else {
                  }
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                    alignSelf: 'center',
                    textAlignVertical: 'center',
                    marginTop: 9,
                  }}
                >
                  Register
                </Text>
              </TouchableHighlight>
            </View>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                alignSelf: 'center',
                textAlignVertical: 'center',
                marginTop: 9,
              }}
            >
              You already have an account? &nbsp;
              <Text
                onPress={() => this.props.navigation.replace('Login')}
                style={{color: '#ff0066', textDecorationLine: 'underline'}}
              >
                {' '}
                Login
              </Text>
            </Text>
          </Form>
        
        </Content>
      </Container>
    );
  }

  renderCities({ReciviedCities}) {
    //console.log('renderrrrrrrrrrrrr');
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
            style={{flex: 1, color: '#c8e1ff'}}
            // theme={{color: {primary: '#c8e1ff'}}}
          />
        );
      });
    } else {
      return <Text>No City</Text>;
    }
  }
}
 









export default connect(
    (state)=>{
      console.log('state', state.city);
        return{
            registeredUser:state.authentication.registeredUser,
            ReciviedCities: state.city.citiesLIST,
        
          }
    },
    (dispatch)=>{
        return bindActionCreators({RegisterAction, getCities}, dispatch);
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