import React from 'react';
import { View, Text } from 'native-base';
import { Image } from 'react-native';

const About = (props) => {

    return (
        <View style={{ height: '100%', width: '100%', display: "flex", flexDirection: "column", backgroundColor: '#001648' }}>
            <Image
                resizeMode="center"
                source={require("../../assets/about.png")} style={{ width: '75%', marginStart: "12%" }} />
            <Text style={{margin:"5%",color:"#00a3cc",fontWeight:"bold",textAlign:"center"}}>

                Transportation has turned up to be a very important issue
                that matter nowadays.
                This era, we are having variety of transportations` means
                and Nemours Travel agencies.
                Booking a comfortable mean of transportation Costs us
                time, money and effort.
                And Due To Technology evolution all over the world in all
                fields and the role of technology is to facilitate our daily
                life and to improve it.

                
                Here is in your service.

                {"\n"}
                {"\n"}
                It`s just a start and still under developing,
                Having comfortable safe trip is our mission.
                
                {"\n"}
                {"\n"}The system is for booking any kind of ticket like airplanes, trains or buses. There is too much booking applications like one for trains, one for airplanes and one for buses, our goal is to merge all kind of booking with all companies in one app to make it easy to use.
            </Text>
        </View>
    );
}



export default About

