import React, { useEffect } from 'react';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import registerContainer from '../../Containers/register-container/register-container';
import loginContainer from '../../Containers/login-container/login-container';
import Home from '../home-component/home-component';
import mainScreen from '../../Containers/main-screen-container/main-screen';
import commonTripList from '../../Containers/Common-trip-list/common-trip-list';
import detailContainer from '../../Containers/detail-container/detail-container';
import StripePayment from '../../Containers/payment-container/payment-container';
import usersTripContainer from '../../Containers/usersTrip-container/usersTrip-container';


const Navigator = createStackNavigator();

const UserTripNavigator = (props) => {

    useEffect(()=>{
        const reset = ()=>{
            console.log("unmounting");
            props.navigation.reset({
                routes: [{ name: "StackNavigator" }]
              });
        }
        return reset;
    },[])

    return (
        <Navigator.Navigator initialRouteName="User`s Trip">

            <Navigator.Screen
                name="User`s Trip"
                component={usersTripContainer}
                options={{
                    title: 'My Trips',
                    headerTitleStyle: { textAlign: 'center', marginRight: '20%' },
                    headerStyle: { backgroundColor: '#001648' },
                    headerTintColor: '#03CFFF',
                    drawerIcon: () => (
                        <MaterialCommunityIcons
                            name="ticket-account"
                            size={30}
                            color="#001648"
                        />),
                    headerShown: false,
                }}
                
            />


            <Navigator.Screen
                name="detail"
                component={detailContainer}
                options={{
                    title: 'detail',
                    headerTitleStyle: {textAlign: 'center', marginRight: '20%'},
                    headerStyle: {backgroundColor: '#001648'},
                    headerTintColor: '#03CFFF',
                    headerShown: false,
                }}
            />

        </Navigator.Navigator>
    );
}



export default UserTripNavigator