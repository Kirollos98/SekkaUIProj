import { View, Text, Picker, Container, Content } from "native-base";

import DateTimePicker from '@react-native-community/datetimepicker';

import React, { useEffect, useState } from "react";
import { Alert ,Button, StyleSheet} from "react-native";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import { LogoutAction, getCities } from "../../redux/action/authentication-actions"

const MainScreen = (props) => {

    let [messFlag, setMessFlag] = useState(false);
    //let [date, setDate] = useState(new Date());
    const get=async()=>{ 
        await props.getCities();
        if(props.ReciviedCities){
             console.log( await props.ReciviedCities);
            console.log("7aga tanya");
        }  
       }
        useEffect(() => {
///console.log("state",props.state)
// get();
             



        // const resolveCities = async () => {
        //     let x=[];
        //      await props.ReciviedCities.forEach(city => {
        //          //// x = cities;
        //          x.push(city.cityName)
        //         })
        //         //// setCities(props.ReciviedCities)
        //         console.log("hjgjgjgjgjg",x);
        //         await setCities(x);
        // }
        // resolveCities();
        
        // if (messFlag) {
        //     Alert.alert("success", message, [
        //         {
        //             text: "OK", onPress: () => {
        //                 navigation.navigate('Home')
        //             }

        //         }
        //     ]);
        // }
    },[]);//, [messFlag]
    // console.log(props.ReciviedCities)

// let getCity = async (city) => {
//     await props.ReciviedCities.forEach(city => {
//         setSelectedValue([...selectedValue, city.cityName]);
//     })
// console.log(props.ReciviedCities)
// }

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [selectedValue, setSelectedValue] = useState("from");
    const [cities, setCities] = useState([]);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };



    const setDaate = (newDate) => {
        setDate(newDate);
    }

    return (
        <Container>
            <Text>Welcome !!! to Sekka </Text>
            <View style={styles.container}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    onPress={get()}
                >
                    <Picker.Item label={selectedValue} value={selectedValue} />
                    {/* {console.log("citiesssssssss",cities.toString())} */}
                    { console.log("cityarray itm",cities)}
                    {cities.forEach(city => {
                        <Picker.Item label={city} value={city} />
                    })}
                </Picker>
            </View>
            <View>
                <Button onPress={showDatepicker} title="Show date picker!" />
            </View>
            <View>
                <Button onPress={showTimepicker} title="Show time picker!" />
            </View>
            <Content>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}          
                <Text>{date.toDateString()}</Text>
            </Content>

            {/* <Button onPress={async()=>{
                console.log("gowa el logout onpress")
                await LogoutAction();
                setMessFlag(true);
                
            }}><Text>Logout</Text></Button> */}
        </Container>
    )
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