import { FlatList } from "react-native-gesture-handler";
import { connect }  from "react-redux";
import React from 'react';
import {StyleSheet, ActivityIndicator, Image} from 'react-native';

import { View, Text, Button,Right,Left,Icon,ListItem, Row, Col } from 'native-base';


const TripList = (props) => {
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
        ListEmptyComponent={EmptyList(props)}
        
      />
    );
}
 

const EmptyList = (props) => {
    setTimeout(() => {
        if(props.tripList){
            return (
                <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="red" />
          </View>
          );
        }else {
            return <Text style={{textAlign: 'center'}}>No Trips available</Text>;
        }    
    },3000);
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
    flexDirection: 'row',
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

