import {
  View,
  Text,
  Icon,
  Container,
  Header,
  Tab,
  TabHeading,
  Tabs,
} from 'native-base';

import { connect }  from "react-redux";
import React, {useEffect, useState} from 'react';
import ListTripsScreen from '../list-trips/list-trips-screen';


const commonTripList = (props) => {
const [train,setTrain] = useState([]); 
const [plane,setPlane] = useState([]); 
const [bus,setBus] = useState([]); 

useEffect(()=>{

    if(props.tripList){
        let sourceList = props.tripList.filter((item) => new Date(item.date) > new Date() );
        let trainList = sourceList.filter((item) => item.type == 'train');
        let busList = sourceList.filter((item) => item.type == 'bus');
        let planeList = sourceList.filter((item) => item.type == 'plane');
        setTrain(trainList);
        setBus(busList);
        setPlane(planeList);
    }
},[])
    return (
      <View style={{height: '100%', backgroundColor: '#001648'}}>
        <Tabs style={{backgroundColor: '#001648'}} initialPage={0}>
          <Tab
            tabStyle={{alignContent: 'center', backgroundColor: '#001648'}}
            heading={
              <TabHeading style={{backgroundColor: '#001648'}}>
                <Icon name="bus" />
                <Text>Bus</Text>
              </TabHeading>
            }
          >
            <ListTripsScreen navigation={props.navigation} list={bus} />
          </Tab>
          <Tab
            tabStyle={{alignContent: 'center', backgroundColor: '#F1E9E7'}}
            heading={
              <TabHeading style={{backgroundColor: '#001648'}}>
                <Icon name="train" />
                <Text>Train</Text>
              </TabHeading>
            }
          >
            <ListTripsScreen navigation={props.navigation} list={train} />
          </Tab>
          <Tab
            tabStyle={{alignContent: 'center', backgroundColor: '#F1E9E7'}}
            heading={
              <TabHeading style={{backgroundColor: '#001648'}}>
                <Icon name="airplane" />
                <Text>Plane</Text>
              </TabHeading>
            }
          >
            <ListTripsScreen navigation={props.navigation} list={plane} />
          </Tab>
        </Tabs>
      </View>
    );
}
 
export default connect(
    (state)=>{
        return{
            tripList:state.SearchTrip.tripsLIST
        }
    },
)(commonTripList) ;
