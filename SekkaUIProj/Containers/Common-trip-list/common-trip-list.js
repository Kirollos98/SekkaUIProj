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
        let trainList = props.tripList.filter((item) => item.type == 'train');
        let busList = props.tripList.filter((item) => item.type == 'bus');
        let planeList = props.tripList.filter((item) => item.type == 'plane');
        setTrain(trainList);
        setBus(busList);
        setPlane(planeList);
    }
},[])
    return (
      <View style={{height: '100%', backgroundColor: '#F1E9E7'}}>
        <Tabs style={{backgroundColor: '#F1E9E7'}} initialPage={0}>
          <Tab
            tabStyle={{alignContent: 'center', backgroundColor: '#F1E9E7'}}
            heading={
              <TabHeading>
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
              <TabHeading>
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
              <TabHeading>  
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
