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
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import React, {useEffect, useState} from 'react';
import ListTripsScreen from '../list-trips/list-trips-screen';
import React, {Component} from 'react';

import {usersTripfun} from '../../redux/action/trip-actions';

class usersTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming: [],
      past: [],
    };
  }
//   useEffect(()=>{
//     const reset = ()=>{
//         console.log("unmounting");
//         props.navigation.reset({
//             routes: [{ name: "User`s Trip" }]
//           });
//     }
//     return reset;
// },[])

  async componentDidMount() {
    console.log(
      ' component did mounttttttttttttt///////////////////////////////////////'
    );
    await this.props.usersTripfun();
    if (this.props.listOfTrips) {
      // console.log('new date =>>>>>>>> ', new Date());
      // console.log(' date.now  =>>>>>>>> ', Date.now());
      // console.log('tripList =>>>>>>>> ', this.props.listOfTrips);
      let upcominglist = this.props.listOfTrips.filter((item) => {
        return new Date(item.TripID.date) >= new Date();
      });

      let pastList = this.props.listOfTrips.filter(
        (item) => new Date(item.TripID.date) < new Date()
      );
      this.setState({
        upcoming: upcominglist,
        past: pastList,
      });

      //console.log( '+=++++++++++++++++++past+++++++++++++++++++++++++++',this.state.past);
      //console.log( '+=++++++++++++++++++upcoming+++++++++++++++++++++++++++',this.state.upcoming);
    }
  }

  render() {
    return (
      <View style={{height: '100%', backgroundColor: '#001648'}}>
        <Tabs style={{backgroundColor: '#001648'}} initialPage={0}>
          <Tab
            tabStyle={{alignContent: 'center', backgroundColor: '#001648'}}
            heading={
              <TabHeading style={{backgroundColor: '#001648'}}>
                <Text>Past</Text>
              </TabHeading>
            }
          >
            <ListTripsScreen
              navigation={this.props.navigation}
              list={this.state.past}
              flag={true}
              upcoming={false}
            />
          </Tab>
          <Tab
            tabStyle={{alignContent: 'center', backgroundColor: '#F1E9E7'}}
            heading={
              <TabHeading style={{backgroundColor: '#001648'}}>
                <Text>Upcoming</Text>
              </TabHeading>
            }
          >
            <ListTripsScreen
              navigation={this.props.navigation}
              list={this.state.upcoming}
              flag={true}
              upcoming={true}
            />
          </Tab>
        </Tabs>
      </View>
    );
  }
}

export default connect(
  (state) => {
    // console.log('state', state.SearchTrip);
    return {
      listOfTrips: state.SearchTrip.usersTrip,
    };
  },
  (dispatch) => {
    return bindActionCreators({usersTripfun}, dispatch);
  }
)(usersTrip);
