import { View, Text, DatePicker, Container, Content } from "native-base";

import DateTimePicker from '@react-native-community/datetimepicker';


import React, { useEffect, useState } from "react";
import { Alert ,Button} from "react-native";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import { LogoutAction } from "../../redux/action/authentication-actions"
const MainScreen = (props) => {

    let [messFlag, setMessFlag] = useState(false);
    //let [date, setDate] = useState(new Date());

    useEffect(() => {
        if (messFlag) {
            Alert.alert("success", message, [

                {
                    text: "OK", onPress: () => {
                        navigation.navigate('Home')
                    }

                }
            ]);
        }
    }, [messFlag]);



    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

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

export default connect(
    (state) => {
        return {
            message: state.authentication.message
        }
    },
    (dispatch) => {
        return bindActionCreators({ LogoutAction }, dispatch)
    }
)(MainScreen)