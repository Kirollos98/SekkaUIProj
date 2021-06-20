import { FlatList } from "react-native-gesture-handler";
import { connect }  from "react-redux";
import React, {useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator, Image} from 'react-native';

import { View, Text, Button,Right,Left,Icon,ListItem, Row, Col } from 'native-base';

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
        <FlatList
          style={{backgroundColor: 'lightblue'}}
          data={props.tripList}
          renderItem={({item}) => {
            return (
              <ListItem>
                <Left>
                  <Col>
                    <Text>{item.tripNum}</Text>
                    <Text>{item.price}</Text>
                  </Col>
                </Left>
                <Right>
                  <Icon
                    name="eye"
                    onPress={() => {
                      props.navigation.push('detail', {id: item._id});
                    }}
                    style={{color: 'white'}}
                    // color={'white'}
                  />
                </Right>
              </ListItem>
            );
          }}
          ItemSeparatorComponent={ItemSeparator}
          keyExtractor={(item) => item._id.toString()}
          ListEmptyComponent={EmptyList(anime,vis)}
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

export default connect(
    (state)=>{
        return{
            tripList:state.SearchTrip.tripsLIST
        }
    },
)(TripList) ;

