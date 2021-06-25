 import {
   View,
   Text,
   Picker,
   Container,
   Content,
   Icon,
   Button,
 } from 'native-base';
import {MaterialCommunityIcons} from '@expo/vector-icons';
 import DateTimePicker from '@react-native-community/datetimepicker';
 import LottieView from 'lottie-react-native';

 import React from "react";
 import {
   Alert,
   StyleSheet,
   TouchableOpacity,
 } from 'react-native';
 import { connect } from "react-redux"
 import { bindActionCreators } from "redux";
 import { LogoutAction, getCities } from "../../redux/action/authentication-actions"
 import {search} from '../../redux/action/trip-actions.js';
 import { createIconSetFromFontello } from "react-native-vector-icons";
 import {
   Table,
   TableWrapper,
   Col,
   Cols,
   Cell,
 } from 'react-native-table-component';


import { Component } from "react";

class MainScreen extends Component {
  constructor(props) {
    super(props);
    
     
    const elementIcon = () => (
      // <TouchableOpacity onPress={() => this._alertIndex(value)}>
      //   <View style={styles.btn}>
      //     <Text style={styles.btnText}>button</Text>
      //   </View>
      // </TouchableOpacity>
      // <Icon name="map-signs" />
      <MaterialCommunityIcons
        name="google-maps"
        size={30}
        color="#001648"
        style={{textAlign: 'center'}}
      />
    );
    
    this.state = {
      selectedValueFrom: '',
      selectedValueTo: '',
      date: new Date(),
      mode: 'date',
      show: false,
      messFlag: false,
      listTrip: [],
      
      tableData: [elementIcon()],
    };
    

  }
   
 
  async componentDidMount() {
    await this.props.getCities(true);
    this.setState({selectedValueFrom:this.props.ReciviedCities.user.city})
    // let user = await getData('loggedUser');
    // let parseUser = await JSON.parse(user);
    // console.log('userparsedddddddddddddddddddddddddddddddddddddddddddddddddddd');
  }
  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;

    this.setState({show: Platform.OS === 'ios'});

    this.setState({date: currentDate});
  };

  showMode = (currentMode) => {
    this.setState({show: true});

    this.setState({mode: currentMode});
  };

  showDatepicker = () => {
    this.showMode('date');
  };

  //  showTimepicker = () => {
  //    this.showMode('time');
  // };

  setDaate = (newDate) => {
    this.setState({date: newDate});
  };



  render() {
   const fromInput = () => (
     //<View style={styles.container}>
     <Picker
       selectedValue={this.state.selectedValueFrom}
       style={{height: 50, width: '90%', marginLeft: '10%'}}
       onValueChange={(itemValue, itemIndex) =>
           this.setState({selectedValueFrom: itemValue})      
       }
     >
       <Picker.Item label="From" value="" />
       {this.renderCities(this.props)}
     </Picker>
     // </View>
   );
    const toInput = () => (
      <Picker
        selectedValue={this.state.selectedValueTo}
        style={{height: 50, width: '90%', marginLeft: '10%'}}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({selectedValueTo: itemValue})
        }
      >
        <Picker.Item label="To" value="" style={{textAlign: 'center'}} />

        {this.renderCities(this.props)}
      </Picker>
    );

const swapIcon = () => (
  <MaterialCommunityIcons
    name="swap-vertical"
    size={30}
    color="#001648"
    style={{textAlign: 'left', marginLeft:0}}
    onPress={()=>{
      let temp= this.state.selectedValueTo;
      this.setState({selectedValueTo: this.state.selectedValueFrom});
      this.setState({selectedValueFrom: temp});
    }}
  />
);
const DatePick = () => (
  <View>
    {/* <Button onPress={this.showDatepicker} style={{backgroundColor: '#c8e1ff'}}> */}
    <Icon
      name="calendar"
      onPress={this.showDatepicker}
      style={{color: '#001648', textAlign: 'center'}}
    />
    {/* </Button> */}
    <Content>
      {this.state.show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.date}
          mode={this.state.mode}
          is24Hour={true}
          display="default"
          onChange={this.onChange}
        />
      )}
      <Text>{this.state.date.toString()}</Text>
      {/* ISOString().split('T')[0] */}
    </Content>
  </View>
);
    return (
      <Container style={{backgroundColor: '#001648'}}>
        <View
          style={{
            flex: 1,
            padding: 16,
            paddingTop: 30,
            backgroundColor: '#fff',
            borderRadius: 30,
            backgroundColor: '#001648'
          }}
          borderRadius={30}
        >
          <Table
            style={{flexDirection: 'row', borderRadius: 30}}
            // borderStyle={{
            //   borderWidth: 2,
            //   // borderColor: 'black',
            // }}
          >
            {/* Left Wrapper */}
            <TableWrapper style={{width: '95%', borderRadius: 30}}>
              {/* <Cell data="" style={styless.singleHead} /> */}
              <TableWrapper style={{flexDirection: 'row'}}>
                <Col
                  data={this.state.tableData}
                  style={{flex: 1.2, backgroundColor: '#c8e1ff'}}
                  heightArr={[60]}
                  textStyle={{textAlign: 'center'}}
                ></Col>
                <Col
                  data={[fromInput(), toInput()]}
                  style={{flex: 5, backgroundColor: '#f6f8fa', width: '50%'}}
                  heightArr={[30, 30]}
                  textStyle={{marginRight: 6, textAlign: 'right'}}
                ></Col>
                <Col
                  data={[swapIcon()]}
                  style={{flex: 1, backgroundColor: '#f6f8fa'}}
                  heightArr={[60]}
                  textStyle={{}}
                ></Col>
              </TableWrapper>
            </TableWrapper>

            {/* Right Wrapper */}
            {/* <TableWrapper style={{flex: 1}}>
              <Cols
                data={this.state.tableData}
                heightArr={[40, 30, 30, 30, 30]}
                textStyle={styless.text}
              />
            </TableWrapper> */}
          </Table>

          <Table
            style={{flexDirection: 'row', borderRadius: 30, marginTop: '5%'}}
          >
            {/* Left Wrapper */}
            <TableWrapper style={{width: '95%', borderRadius: 30}}>
              <TableWrapper style={{flexDirection: 'row'}}>
                <Col
                  data={[DatePick()]}
                  style={{flex: 1, backgroundColor: '#c8e1ff'}}
                  heightArr={[60]}
                  textStyle={{textAlign: 'center'}}
                ></Col>
                <Col
                  data={[
                    this.state.date.toString().split(' ')[0] +
                      ' ' +
                      this.state.date.toString().split(' ')[1] +
                      ' ' +
                      this.state.date.toString().split(' ')[2] +
                      ' ' +
                      this.state.date.toString().split(' ')[3],
                  ]}
                  style={{flex: 5, backgroundColor: '#f6f8fa', width: '50%'}}
                  heightArr={[30]}
                  textStyle={{
                    marginRight: 6,
                    textAlign: 'center',
                    marginTop: '10%',
                  }}
                ></Col>
              </TableWrapper>
            </TableWrapper>
          </Table>

          <Button
            style={{
              marginTop: '10%',
              backgroundColor: '#c8e1ff',
              alignSelf:'center'
              // shadowColor: '#97C2F7',
            }}
            onPress={async () => {
              // console.log('Awel el on press --------------------------------');
              if (
                this.state.selectedValueFrom !== 'From' &&
                this.state.selectedValueFrom !== ''
              ) {
                if (
                  this.state.selectedValueTo !== 'From' &&
                  this.state.selectedValueTo !== ''
                ) {
                  // console.log(
                  //   this.state.date.toISOString(),
                  //   'dateIossssssssssssssssssssssssssoooo'
                  // );
                  let obj = {
                    fromCityName: this.state.selectedValueFrom,
                    toCityName: this.state.selectedValueTo,
                    date: this.state.date
                      .toISOString()
                      .replace(`.000Z`, ` `)
                      .split('T')[0],
                  };
                  // console.log('from obj hey ', obj);
                  // console.log('state to props ', this.props.listOfTrips);

                  await this.props.search(obj);
                  // console.log(
                  //   'state to props b3d el search call ',
                  //   this.props.listOfTrips
                  // );

                  this.setState({listTrip: this.props.listOfTrips});
                  //console.log('mashy ya kiro yarab awsal hena ');

                  //this.props.navigation.pop();
                  this.props.navigation.push('ListTrip');
                  // this.setState({listTrip:listt})
                  // this.state.listTrip.map(()=>{
                  //   console.log("el date ",item.date);
                  // })
                  //   let listt = [...this.state.listTrip]
                  // let filtered = [];
                  //   listt.forEach((item)=>{
                  //       console.log(item.date.split('T')[0]+'   -----------++++++++++=========');

                  //        if(item.date.split('T')[0] == this.state.mode.toISOString().split('T')[0]){
                  //           filtered.push(item);
                  //        }

                  //   })

                  // this.setState({listTrip:filtered});
                  // console.log(
                  //   '--------------------------------the new list',
                  //   listt
                  // );

                  // console.log(
                  //   'b3d assigning el state --------------------------------',
                  //   this.state.listTrip
                  // );
                  // console.log(
                  //   'list of trips======@@@### ',
                  //   this.state.listTrip
                  // );
                } else {
                  Alert.alert('Please enter your destination city');
                }
              } else {
                Alert.alert('Please enter your pickup city');
              }
            }}
          >
            <Text style={{color: '#001648'}}>submit Your Trip!</Text>
          </Button>
        </View>
        <View style={{width:'100%'}}>

          <LottieView source={require('../../assets/lottie/traveler.json')} autoPlay loop style={{width:400,height:350,alignSelf:"center"}}/>          
        </View>

      </Container>
    );
  }

  renderCities({ReciviedCities}) {
    if (ReciviedCities) {
      // console.log('recieveddddddddddd ', ReciviedCities);
      let x = [];
      ReciviedCities.cities.forEach((element) => {
        x.push(element.cityName);
      });

      return x.map((s, i) => {
        return <Picker.Item key={i} value={s} label={s} />;
      });
    } else {
      return <Text>No User Found</Text>;
    }
  }
}
 const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center"
    }
});





export default connect(
    (state) => {
        // console.log("state",state)
        return {
          message: state.authentication.message,
          ReciviedCities: state.city.citiesLIST,
          listOfTrips: state.SearchTrip.tripsLIST,

        };
    },
    (dispatch) => {
        return bindActionCreators({LogoutAction, getCities, search}, dispatch);
    }
)(MainScreen)