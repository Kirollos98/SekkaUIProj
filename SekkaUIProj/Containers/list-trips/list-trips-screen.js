import { FlatList } from "react-native-gesture-handler";
import { connect }  from "react-redux";
import React, {useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator, Image} from 'react-native';

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
  Thumbnail,
} from 'native-base';

// import TripScreen from '../../Components/trip-component/Trip-component';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const TripList = (props) => {

  const [animating, setAnimating] = useState(true);
  const [visible, setVisible] = useState(false);
 
  const closeActivityIndicator = () => {
    setTimeout(() => {
      setAnimating(false);    
      setVisible(true);
    }, 3000)
  }
  useEffect(() => closeActivityIndicator(),[])
 
  let anime = animating;
  let vis = visible;

  const Tab = createMaterialBottomTabNavigator();
  let img = '../../assets/' + item.type + '.png';
    return (
      // <FlatList
      //     data={props.tripsLIST}
      //     renderItem={(item)=>{

      //     }}
      //     ItemSeparatorComponent{()=>{
      //         return(
      //             <View style={{width:"100%",backgroundColor:"black"}}>

      //             </View>
      //         )
      //     }}

      // />
      // <View>
      //   <Tab.Navigator>
      //     <Tab.Screen name="Train" component={TripScreen} />
      //     <Tab.Screen name="Bus" component={TripScreen} />
      //     <Tab.Screen name="plan" component={TripScreen} />
      //   </Tab.Navigator>

      /**
       * 
       * [2:59 PM] huda.ahmeed.2020 (Guest)
      <ListItem avatar style={​{​height:120 ,margin:20,padding:20,borderRadius:30,backgroundColor:'#3081A7'}​}​>
      <Left>
      <Thumbnailstyle={​{​width:70,height:70}​}​source={​{​ uri:item.avatar }​}​/>
      </Left>
      <Body>
      <Text>{​item.first_name}​</Text>
      <Textnotestyle={​{​color:'white'}​}​>{​item.email}​</Text>
      </Body>
      <Rightstyle={​{​height:68}​}​>
      <Iconname="eye"onPress={​
                              () => {​
      navigation.navigate('details', {​ id:item.id }​)
                              }​
      }​/>
      </Right>
      </ListItem>

       */
      <FlatList
        style={{backgroundColor: '#001648'}}
        data={props.list}
        renderItem={({item}) => {
          return (
            <ListItem
              style={{
                height: 100,
                margin: '5%',
                padding: '5%',
                borderRadius: 20,
                backgroundColor: '#c8e1ff',
              }}
            >
              <Left>
                <Thumbnail
                  style={{width: 70, height: 70}}
                  source= {require(img)}
                />
              </Left>
              <Body>
                <Col>
                  <Text style={{color: '#001648'}}>{item.tripNum}</Text>
                  <Text>  {item.price}</Text>
                </Col>
              </Body>
              <Right>
                <Icon
                  name="eye"
                  onPress={() => {
                    props.navigation.push('detail', {id: item._id});
                  }}
                  style={{color: '#001648'}}
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
 

const EmptyList = (anime,visible) => {
  return(
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="red" animating={anime}/>
    {
    visible &&
    (<Text style={{ textAlign: "center" }}>No Trips available</Text>)
    }
  </View>
  );
};

const ItemSeparator = () => {
  return <ListItem itemDivider></ListItem>;
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

