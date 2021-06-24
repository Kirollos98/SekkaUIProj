import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import registerContainer from '../../Containers/register-container/register-container';
import {Icon, Row, Text, View} from 'native-base';
import loginContainer from '../../Containers/login-container/login-container';
import Home from '../home-component/home-component';
import mainScreen from '../../Containers/main-screen-container/main-screen';
import commonTripList from '../../Containers/Common-trip-list/common-trip-list';
import detailContainer from '../../Containers/detail-container/detail-container';
import StripePayment from '../../Containers/payment-container/payment-container';
import StackNavigatorComponent from '../stack-navigator/stack-navigator-componen';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {LogoutAction} from '../../redux/action/authentication-actions'
import { bindActionCreators } from "redux";

import usersTripContainer from '../../Containers/usersTrip-container/usersTrip-container';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import UserTripNavigator from '../user-trips-navigator/user-trips-navigator';

const Navigator = createDrawerNavigator();
// const Navigator2 = createDrawerNavigator({
//     Home:{screen:StackNavigatorComponent},
// },{
//     contentComponent: (props) => (
//     <SafeAreaView style={styles.container}>
//         <View style={{height: 100,alignItems: 'center', justifyContent: 'center'}}>

//           <Text style={{fontSize: 32}}>LOGO</Text>
//         </View>
//       <ScrollView>
//         <DrawerItems {...props} />
//       </ScrollView>
//     </SafeAreaView>
//    )
// });

function CustomDrawerContent(properties) {
  return (
    <DrawerContentScrollView {...properties}>
      <DrawerItemList {...properties} />
      <DrawerItem
        onPress={async()=>{
          console.log("logging out !");
          console.log("logging out !----------------",externalProps);
          await externalProps.LogoutAction();
          if(externalProps.loggingoutOp){
            if(externalProps.loggingoutOp.success){
              console.log(externalProps.loggingoutOp);
              externalProps.navigation.push("Home");
            }
          }
        }}
        label={() => (
          <View style={{display:"flex", flexDirection:"row"}}>
            
            <MaterialCommunityIcons
                name="logout"
                size={30}
                color="#001648"
                style={{textAlign: 'center'}}
              />
            <Text style={{color: 'black',marginStart:"15%"}}>
              Logout
            </Text>
          </View>
        )}
        // style={{ backgroundColor: 'red' }}
      />
    </DrawerContentScrollView>
  );
}

let externalProps= {};

const DrawerNavigatorComponent = (props) => {
  externalProps = props
  return (
    <Navigator.Navigator
      overlayColor="#001648"
      drawerType="back"
      drawerContent={(properties) => <CustomDrawerContent {...properties} />}
      initialRouteName="StackNavigator"
      screenOptions={{
        unmountOnBlur:true
      }}
    >
      <Navigator.Screen
        name="StackNavigator"
        component={StackNavigatorComponent}
        options={{
          title: "Home",
          headerTitleStyle: {textAlign: 'center', marginRight: '20%'},
          headerStyle: {backgroundColor: '#001648'},
          headerTintColor: '#03CFFF',
          drawerIcon:()=>(<Icon name="home" style={{color:"#001648"}}/>),
        }}
      />
      {/* <Navigator.Screen
        name="MainPage"
        component={mainScreen}
        options={{
          title: 'Home',
          headerTitleStyle: {textAlign: 'center', marginRight: '20%'},
          headerStyle: {backgroundColor: '#001648'},
          headerTintColor: '#03CFFF',
        }}
      /> */}
      <Navigator.Screen
        name="User`s Trip"
        component={UserTripNavigator}
        options={{
          title: 'My Trips',
          headerTitleStyle: {textAlign: 'center', marginRight: '20%'},
          headerStyle: {backgroundColor: '#001648'},
          headerTintColor: '#03CFFF',
          drawerIcon:()=>(
          <MaterialCommunityIcons
            name="ticket-account"
            size={30}
            color="#001648"
          />),
          
        }}
      />
    </Navigator.Navigator>
  );
};

export default connect(
  (state)=>{
    // console.log(state,"---------------------------");
    return{
      loggingoutOp:state.authentication.logoutResponse
    }
  },
  (dispatch)=>{
    return bindActionCreators({LogoutAction},dispatch)
  }
)(DrawerNavigatorComponent) ;
