 import { View, Text, Picker, Container, Content } from "native-base";

 import DateTimePicker from '@react-native-community/datetimepicker';

 import React from "react";
 import { Alert ,Button, StyleSheet} from "react-native";
 import { connect } from "react-redux"
 import { bindActionCreators } from "redux";
 import { LogoutAction, getCities } from "../../redux/action/authentication-actions"
 import { createIconSetFromFontello } from "react-native-vector-icons";

// const MainScreen = (props) => {

//     let [messFlag, setMessFlag] = useState(false);
//     let [citiesList,setCities]=useState([]);
//      const get=async()=>{ 
//         await props.getCities();
//         let x=[];
//         if(await props.ReciviedCities){
//             console.log("if");
//            console.log( await props.ReciviedCities);
//             console.log("7aga tanya");
//            props.ReciviedCities.forEach(city=>{
//                console.log(city.cityName);
//            // setCities([...citiesList,city.cityName]);
//            x.push(city.cityName);
//            })
//            setCities(x);
//            console.log(x);
//          console.log(citiesList);
//         }  
//        }

// const get2=async()=>{
//     await get();
// }
//         useEffect(() => {
    //kiroooooooooooooooooooooooooooooooooooooooooooooooo
     // if (messFlag) {
        //     Alert.alert("success", message, [
        //         {
        //             text: "OK", onPress: () => {
        //                 navigation.navigate('Home')
        //             }

        //         }
        //     ]);
//             get2();
//     },[]);//, [messFlag]

//     const [date, setDate] = useState(new Date(1598051730000));
//     const [mode, setMode] = useState('date');
//     const [show, setShow] = useState(false);
//     const [selectedValue, setSelectedValue] = useState("from");
//   //  const [cities, setCities] = useState([]);


//     const onChange = (event, selectedDate) => {
//         const currentDate = selectedDate || date;
//         setShow(Platform.OS === 'ios');
//         setDate(currentDate);
//     };

//     const showMode = (currentMode) => {
//         setShow(true);
//         setMode(currentMode);
//     };

//     const showDatepicker = () => {
//         showMode('date');
//     };

//     const showTimepicker = () => {
//         showMode('time');
//     };



//     const setDaate = (newDate) => {
//         setDate(newDate);
//     }
//     let PickerItems = citiesList.map( (s, i) => {
//         return <Picker.Item key={i} value={s} label={s} />
//     });
//     return (
//         <Container>
//             <Text>Welcome !!! to Sekka </Text>
//             <View style={styles.container}>
//                 <Picker
//                     selectedValue={selectedValue}
//                     style={{ height: 50, width: 150 }}
//                     onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
//                    // onPress={get()}
//                 >
//                     <Picker.Item label={selectedValue} value={selectedValue} />
//                     {/* {console.log("citiesssssssss",cities.toString())} */}
//                     {  console.log("cityarray itm",citiesList)} 
//                     {PickerItems}
//                     {/* {citiesList.forEach(city => {
//                         <Picker.Item label={city} value={city} />
//                     })} */}
//                 </Picker>
//             </View>
//             <View>
//                 <Button onPress={showDatepicker} title="Show date picker!" />
//             </View>
//             <View>
//                 <Button onPress={showTimepicker} title="Show time picker!" />
//             </View>
//             <Content>
//                 {show && (
//                     <DateTimePicker
//                         testID="dateTimePicker"
//                         value={date}
//                         mode={mode}
//                         is24Hour={true}
//                         display="default"
//                         onChange={onChange}
//                     />
//                 )}          
//                 <Text>{date.toDateString()}</Text>
//             </Content>

//             {/* <Button onPress={async()=>{
//                 console.log("gowa el logout onpress")
//                 await LogoutAction();
//                 setMessFlag(true);
                
//             }}><Text>Logout</Text></Button> */}
//         </Container>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 40,
//         alignItems: "center"
//     }
// });

// export default connect(
//     (state) => {
        
//         return {
//             message: state.authentication.message,
//             ReciviedCities: state.city.citiesLIST
//         }
//     },
//     (dispatch) => {
//         return bindActionCreators({ LogoutAction,  getCities}, dispatch)
//     }
// )(MainScreen)

import { Component } from "react";

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
        selectedValueFrom:"",
        selectedValueTo:"",
        date:new Date(1598051730000),
        mode:'date',
        show:false,
        messFlag:false,
      
    }
  }
 async componentDidMount()
 {
     await this.props.getCities();
    
 }
     onChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date;
     
        this.setState({show:(Platform.OS === 'ios')});
        
        this.setState({date:currentDate});

    };

     showMode = (currentMode) => {
      
        this.setState({show:true});

       this.setState({mode:currentMode});

    };

     showDatepicker = () => {
        this.showMode('date');
        

    };

     showTimepicker = () => {
       this.showMode('time');
    };



     setDaate = (newDate) => {
       
        this.setState({date:newDate});

    }
  render() {
    return (
               <Container>
                <Text>Welcome !!! to Sekka </Text>
                  <View style={styles.container}>
                <Picker
                    
                    selectedValue={this.state.selectedValueFrom}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({selectedValueFrom:itemValue})}
                 
                >
                    <Picker.Item label='From' value=''  />
                   
                    {this.renderCities(this.props)}
                  
                </Picker>
            </View>
            <View style={styles.container}>
                <Picker
                    
                    selectedValue={this.state.selectedValueTo}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({selectedValueTo:itemValue})}
                 
                >
                    <Picker.Item label='To' value=''  />
                   
                    {this.renderCities(this.props)}
                  
                </Picker>
            </View>
            <View>
                <Button onPress={this.showDatepicker} title="Show date picker!" />
            </View>
            <View>
                <Button onPress={this.showTimepicker} title="Show time picker!" />
             </View>
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

             </Content>
            
            </Container>
    );
  }
 
  renderCities({ ReciviedCities }) {
    if (ReciviedCities ) {
        let x=[];
        ReciviedCities.forEach(element => {
            x.push(element.cityName);
            
        });

      return x.map((s,i) => {
        return (
           <Picker.Item key={i} value={s} label={s}  />
        );
      });
    } else {
      return <Text >No User Found</Text>;
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
        
        return {
            message: state.authentication.message,
            ReciviedCities: state.city.citiesLIST
        }
    },
    (dispatch) => {
        return bindActionCreators({ LogoutAction,  getCities}, dispatch)
    }
)(MainScreen)