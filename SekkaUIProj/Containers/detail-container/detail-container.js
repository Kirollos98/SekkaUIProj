import { useNavigation } from "@react-navigation/core";
import { Col, View, Text, Row, Button } from "native-base";
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getTripDetial, proceedToPayment } from '../../redux/action/trip-actions';
import { addComplain,addRate,getRate } from '../../redux/action/user-action';
import { StyleSheet, ActivityIndicator, Image, Alert } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretLeft, faCaretRight, faPlaceOfWorship } from '@fortawesome/free-solid-svg-icons'
import { Rating, AirbnbRating } from 'react-native-ratings';

import moment from "moment";

const Detail = (props) => {

  let [seatNum, setSeatNum] = useState(1);
  let [dialogFlag, setdialogFlag] = useState(false);
  // let [complain, setComplain] = useState('');
  //let navigator = useNavigation();
  //console.log(naviga);
  useEffect(() => {
    const resolver = async () => {
      await props.getRate(props.route.params.bookingID);
      await props.getTripDetial(props.route.params.id);
    }
    
    resolver();
  }, [])


  const renderSeatsBtns = () => {
    if (props.route.params.flag != true) {
      return (
        <View style={{ backgroundColor: "#001648", height: 70, borderRadius: 20, marginTop: "3%", padding: 10, display: "flex", flexDirection: "row" }}>


          <View style={{ flex: 2 }}>
            <Text style={{ color: "#c8e1ff", margin: "auto", textAlign: "center", marginTop: "3%", fontSize: 20, marginStart: 10 }}>Number of seats</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Button style={{ backgroundColor: "#001648" }} onPress={() => {
              if (seatNum <= 1) {
                alert("minimum of 1 seat");
              } else {
                setSeatNum(--seatNum);
              }
            }}><FontAwesomeIcon icon={faCaretLeft} color={"#c8e1ff"} size={30} /></Button>
            <Text style={{ color: "#c8e1ff", margin: "auto", marginTop: "7%", textAlign: "center", fontSize: 20 }}>{seatNum}</Text>
            <Button style={{ backgroundColor: "#001648" }} onPress={() => {
              setSeatNum(++seatNum);
            }}><FontAwesomeIcon icon={faCaretRight} color={"#c8e1ff"} size={30} /></Button>
          </View>
        </View >
      )
    } else {
      return (
        <View style={{ backgroundColor: "#001648", height: 70, borderRadius: 20, marginTop: "3%", padding: 10, display: "flex", flexDirection: "row" }}>

          <View style={{ flex: 2 }}>
            <Text style={{ color: "#c8e1ff", margin: "auto", textAlign: "center", marginTop: "3%", fontSize: 20, marginStart: 10 }}>Number of seats</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ color: "#c8e1ff", marginEnd: "10%", marginTop: "7%", textAlign: "center", fontSize: 20 }}>{props.route.params.seatNumber}</Text>
          </View>
        </View>
      )
    }

  }

  const renderBookbtn = () => {
    if (props.route.params.flag != true) {

      return (
        <View style={{ marginTop: "10%", margin: "auto", marginStart: "40%" }}>
          <Button style={{ backgroundColor: "#001648", borderRadius: 5 }} onPress={async () => {
            let bokingObj = {
              tripId: props.details._id,
              seats: seatNum,
              amount: props.details.price * seatNum
            }
            await props.proceedToPayment(bokingObj)
            props.navigation.push('Payment');
          }}><Text>Book</Text></Button>
        </View>
      )
    }
  }

  const ratingCompleted = async (rating) => {
    console.log("Rating is: " + rating)
    let rateObj = {
      bookingId: props.route.params.bookingID,
      rate: rating
    }

    await props.addRate(rateObj);
  }

  const renderComplainBtn = () => {
    console.log("props in details=========", props);
    if (props.route.params.flag == true && props.route.params.isUpcoming !=true) {

      return (
        <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: "5%" }}>


          <Button style={{ backgroundColor: "#AA0000", borderRadius: 5 }} onPress={async () => {
            console.log("alert in complain");
            setdialogFlag(true);
            //Alert.prompt("Complain", "please fill the following fields");
          }}><Text>Complain</Text></Button>

          <AirbnbRating
            starContainerStyle={{backgroundColor:"#001648",padding:5,borderRadius:5}}
            count={5}
            isDisabled={props.rate.rate?true:false}
            reviews={[ "Bad", "OK", "Good", "Very Good", "Unbelievable"]}
            defaultRating={props.rate.rate}
            size={20}
            selectedColor="#FCC201"
            reviewColor="#001648"
            onFinishRating={ratingCompleted}
          />

        </View>
      )
    }
  }


  const submitComplain = async (complain) => {
    let complainObj = {
      bookingId: props.route.params.bookingID,
      complain: complain
    }
    console.log("Complain",complainObj);

    await props.addComplain(complainObj)

    if (faPlaceOfWorship.complainResponse.done) {
      Alert.alert("Complain notification", "Your Complain has been added successfully !");
    } else {
      Alert.alert("Complain notification", "Somthing went wrong !");

    }
  }

  if (props.details) {

    return (
      <View style={{ backgroundColor: "#001648", height: "100%" }}>
        <DialogInput isDialogVisible={dialogFlag}
          title={"Complain"}
          message={"Complain Goes Here"}
          hintInput={"complain ...."}

          submitInput={(inputText) => { submitComplain(inputText); setdialogFlag(false) }}
          closeDialog={() => { setdialogFlag(false) }}>
        </DialogInput>

        <View style={{ backgroundColor: "#c8e1ff", borderRadius: 30, margin: "5%", padding: "5%", height: "90%" }}>
          <View style={{ backgroundColor: "#c8e1ff", display: "flex", flexDirection: "row", margin: "5%" }}>
            <Col style={{ flex: 1,maxHeight:100 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>From</Text>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>{props.details.fromId.cityName.toUpperCase()}</Text>
            </Col>

            <Col style={{ flex: 1,maxHeight:100 }}>
              <Image
                resizeMode="contain"
                style={{ maxWidth: 100, maxHeight: 100 }}
                source={props.details.type == "train" ? require("../../assets/train.png") : props.details.type == "bus" ? require("../../assets/bus.png") : require("../../assets/plane.png")}
              ></Image>
            </Col>
            <Col style={{ flex: 1,maxHeight:100 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>To</Text>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>{props.details.toId.cityName.toUpperCase()}</Text>
            </Col>
          </View>
          <View style={{ backgroundColor: "#001648", height: 70, borderRadius: 20 }}>
            <Text style={{ color: "#c8e1ff", margin: "auto", textAlign: "center", marginTop: "2%", fontSize: 20 }}>Departure on {moment(props.details.date).utc().format('DD-MM-YYYY')}</Text>
            <Text style={{ color: "#c8e1ff", margin: "auto", textAlign: "center", marginTop: "2%", fontSize: 20 }}>Time : {moment(props.details.date).utc().format('hh:mm a')}</Text>
          </View>
          {renderSeatsBtns()}
          {renderBookbtn()}
          {renderComplainBtn()}
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
      complainResponse: state.user.complainResponse,
      rate:state.user.rating
    };
  },
  (dispatch) => {
    return bindActionCreators({ getTripDetial, proceedToPayment, addComplain,addRate,getRate }, dispatch);
  }
)(Detail);
