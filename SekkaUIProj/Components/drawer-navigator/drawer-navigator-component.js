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
import {Icon, Text} from 'native-base';
import loginContainer from '../../Containers/login-container/login-container';
import Home from '../home-component/home-component';
import mainScreen from '../../Containers/main-screen-container/main-screen';
import commonTripList from '../../Containers/Common-trip-list/common-trip-list';
import detailContainer from '../../Containers/detail-container/detail-container';
import StripePayment from '../../Containers/payment-container/payment-container';
import StackNavigatorComponent from '../stack-navigator/stack-navigator-componen';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import usersTripContainer from '../../Containers/usersTrip-container/usersTrip-container';

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

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={() => (
          <Text style={{color: 'black'}}>
            <MaterialCommunityIcons
              name="logout"
              size={30}
              color="#001648"
              style={{textAlign: 'center'}}
            />
            Logout
          </Text>
        )}
        // style={{ backgroundColor: 'red' }}
        onPress={() => alert('Logged out')}
      />
      <DrawerItem
        label={() => (
          <Text style={{color: 'black'}}>
            <MaterialCommunityIcons
              name="logout"
              size={30}
              color="#001648"
              style={{textAlign: 'center'}}
            />
            Logout
          </Text>
        )}
        // style={{ backgroundColor: 'red' }}
      />
    </DrawerContentScrollView>
  );
}

const DrawerNavigatorComponent = (props) => {
  return (
    <Navigator.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="StackNavigator"
    >
      <Navigator.Screen
        name="StackNavigator"
        component={StackNavigatorComponent}
        options={{
          title: 'SEKKA',
          headerTitleStyle: {textAlign: 'center', marginRight: '20%'},
          headerStyle: {backgroundColor: '#001648'},
          headerTintColor: '#03CFFF',
        }}
      />
      <Navigator.Screen
        name="MainPage"
        component={mainScreen}
        options={{
          title: 'Home',
          headerTitleStyle: {textAlign: 'center', marginRight: '20%'},
          headerStyle: {backgroundColor: '#001648'},
          headerTintColor: '#03CFFF',
        }}
      />
      <Navigator.Screen
        name="User`s Trip"
        component={usersTripContainer}
        options={{
          title: 'My Trips',
          headerTitleStyle: {textAlign: 'center', marginRight: '20%'},
          headerStyle: {backgroundColor: '#001648'},
          headerTintColor: '#03CFFF',
        }}
      />
    </Navigator.Navigator>
  );
};

export default DrawerNavigatorComponent;
