import { useNavigation } from "@react-navigation/core";
import { Col, View, Text, Row, Button } from "native-base";
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getTripDetial ,bookTrip} from '../../redux/action/trip-actions';
import { StyleSheet, ActivityIndicator, Image } from 'react-native';

import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

import moment from "moment";

const Detail = (props) => {

  let [seatNum, setSeatNum] = useState(1);
  //let navigator = useNavigation();
  //console.log(naviga);
  useEffect(() => {
    const resolver = async () => {
      await props.getTripDetial(props.route.params.id);
    }
    resolver();
  }, [])
  if (props.details) {

    return (
      <View style={{ backgroundColor: "#001648", height: "100%" }}>
        <View style={{ backgroundColor: "#c8e1ff", borderRadius: 30, margin: "5%", padding: "5%", height: "90%" }}>
          <View style={{ backgroundColor: "#c8e1ff", display: "flex", flexDirection: "row", margin: "5%" }}>
            <Col style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>From</Text>
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>{props.details.fromId.cityName.toUpperCase()}</Text>
            </Col>

            <Col style={{ flex: 1 }}>
              <Image
                resizeMode="contain"
                style={{ maxWidth: 100, maxHeight: 100 }}
                source={props.details.type == "train" ? require("../../assets/train.png") : props.details.type == "bus" ? require("../../assets/bus.png") : require("../../assets/plane.png")}
              ></Image>
            </Col>
            <Col style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>To</Text>
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>{props.details.toId.cityName.toUpperCase()}</Text>
            </Col>
          </View>
          <View style={{ backgroundColor: "#001648", height: 70, borderRadius: 20 }}>
            <Text style={{ color: "#c8e1ff", margin: "auto", textAlign: "center", marginTop: "2%", fontSize: 20 }}>Departure on {moment(props.details.date).utc().format('DD-MM-YYYY')}</Text>
            <Text style={{ color: "#c8e1ff", margin: "auto", textAlign: "center", marginTop: "2%", fontSize: 20 }}>Time : {moment(props.details.date).utc().format('hh:mm:ss a')}</Text>
          </View>

          <View style={{ backgroundColor: "#001648", height: 70, borderRadius: 20, marginTop: "3%", padding: 10, display: "flex", flexDirection: "row" }}>
            <View style={{ flex: 2 }}>
              <Text style={{ color: "#c8e1ff", margin: "auto", textAlign: "center", marginTop: "3%", fontSize: 20, marginStart: 10 }}>number of seats</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Button style={{ backgroundColor: "#001648" }} onPress={() => {
                setSeatNum(--seatNum);
              }}><FontAwesomeIcon icon={faCaretLeft} color={"#c8e1ff"} size={30} /></Button>
              <Text style={{ color: "#c8e1ff", margin: "auto", marginTop: "7%", textAlign: "center", fontSize: 20 }}>{seatNum}</Text>
              <Button style={{ backgroundColor: "#001648" }} onPress={() => {
                setSeatNum(++seatNum);
              }}><FontAwesomeIcon icon={faCaretRight} color={"#c8e1ff"} size={30} /></Button>
            </View>
          </View>
          <View style={{ marginTop: "10%", margin: "auto", marginStart: "40%" }}>
            <Button style={{ backgroundColor: "#001648", borderRadius: 5 }} onPress={async()=>{
              let bokingObj = {
                tripId : props.details._id,
                seats: seatNum
              }
              await bookTrip(bokingObj)
            }}><Text>Book</Text></Button>
          </View>

        </View>

      </View>
    );
  } else {
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
    return bindActionCreators({ getTripDetial,bookTrip }, dispatch);
  }
)(Detail);
