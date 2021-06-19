import { useNavigation } from "@react-navigation/core";
import { Col, View,Text } from "native-base";
import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import {getTripDetial} from '../../redux/action/trip-actions';
import {StyleSheet, ActivityIndicator, Image} from 'react-native';

const Detail = (props) => {


    //let navigator = useNavigation();
    //console.log(naviga);
    useEffect(()=>{
        const resolver = async()=>{
            await props.getTripDetial(props.route.params.id);
        }
        resolver();
    },[])
    if(props.details){
        
        return (
          <View>
            <Col>
              <Text>{props.details.tripNum}</Text>
              <Text>{props.details.toId.cityName}</Text>
              <Text>{props.details.fromId.cityName}</Text>
            </Col>
          </View>
        );
    }else{
        return (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="red" />
          </View>
        );
    }
}
 
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
  (state) => {
    return {
      details: state.SearchTrip.tripDetails,
    };
  },
  (dispatch) => {
    return bindActionCreators({getTripDetial}, dispatch);
  }
)(Detail);
