import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, Image } from 'react-native';
import {
  View,
  Text,
  Button,
  Right,
  Left,
  Icon,
  ListItem,
  Row,
  Col,
  Body,
} from 'native-base';

// import TripScreen from '../../Components/trip-component/Trip-component';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import moment from "moment";

const TripList = (props) => {

  const [animating, setAnimating] = useState(true);
  const [visible, setVisible] = useState(false);

  const closeActivityIndicator = () => {
    setTimeout(() => {
      setAnimating(false);
      setVisible(true);
    }, 3000)
  }
  useEffect(() => closeActivityIndicator(), [])

  let anime = animating;
  let vis = visible;
  function makeTwoDigits(time) {
    const timeString = `${time}`;
    if (timeString.length === 2) return time
    return `0${time}`
  }
  const Tab = createMaterialBottomTabNavigator();
  // let img = '../../assets/' + item.type + '.png';
  return (
    
    <FlatList
      style={{ backgroundColor: '#001648' }}
      data={props.list}
      renderItem={({ item }) => {

        // console.log(item.date);

        // console.log(moment(item.date).utc().format('hh:mm:ss a'));

        // console.log(new Date(item.date).getHours());
        // console.log(new Date(item.date).getMinutes());
        // console.log(new Date(item.date).getSeconds());
        // console.log(`${new Date(item.date)}:${new Date(item.date).getSeconds()}:${new Date(item.date).getSeconds()}`);
        return (
          <ListItem
            style={{
              height: 120,
              margin: '5%',
              padding: '5%',
              borderRadius: 20,
              backgroundColor: '#c8e1ff',
            }}
          >
            <Left style={{ flex: 0.5 }}>
              <Image
                style={{ width: 50, height: 50 }}
                source={item.type == "train" ? require("../../assets/train.png") : item.type == "bus" ? require("../../assets/bus.png") : require("../../assets/plane.png")}
              />
            </Left>
            <Body style={{ flex:2 }}>
              <Row>
                <Col>
                  <Row>

                    <Text style={{ color: '#001648', fontWeight: "bold" }}>TripNumber:</Text>
                    <Text style={{ color: '#001648' }}>{item.tripNum}</Text>
                  </Row>
                  <Row>

                    <Text style={{ color: '#001648', fontWeight: "bold" }}>Price:</Text>
                    <Text style={{ color: '#001648' }}>{item.price / 1000} L.E</Text>
                  </Row>
                  <Row>
                    <Text style={{ color: '#001648', fontWeight: "bold" }}>Time:</Text>
                    <Text>{moment(item.date).utc().format('hh:mm:ss a')}</Text>
                  </Row>
                  <Row>
                    <Text style={{ color: '#001648', fontWeight: "bold" }}>seats:</Text>
                    <Text>{item.seat === 0?"Fully Booked":item.seat}</Text>
                  </Row>
                </Col>


              </Row>

            </Body>
            <Right>
              <Icon
                name="eye"
                onPress={() => {
                  console.log("propssss",props)
                  props.navigation.push('detail', { id: item._id });
                }}
                style={{ color: '#001648' }}
              // color={'white'}
              />
            </Right>
          </ListItem>
        );
      }}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item._id.toString()}
      ListEmptyComponent={EmptyList(anime, vis)}
    />
    // </View>
  );
}


const EmptyList = (anime, visible) => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="red" animating={anime} />
      {
        visible &&
        (<Text style={{ textAlign: "center",color:"#c8e1ff" }}>No Trips available</Text>)
      }
    </View>
  );
};

const ItemSeparator = () => {
  return (
    <ListItem
      itemDivider
      style={{backgroundColor: '#001648', justifyContent: 'center'}}
    >
      <Text style={{color: '#c8e1ff'}}>
        ___________________________________
      </Text>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: '50%',
  },
  horizontal: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default TripList;
// export default connect(
//     (state)=>{
//         return{
//             tripList:state.SearchTrip.tripsLIST
//         }
//     },
// )(TripList) ;

