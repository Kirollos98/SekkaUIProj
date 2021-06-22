import AsyncStorage from '@react-native-async-storage/async-storage';

const Base = 'http://192.168.1.12:3344/api/';

const storeData = async (value,name) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(name, jsonValue)
    } catch (e) {
      // saving error
    }
  }

const getData = async (name) => {
    try {
      const value = await AsyncStorage.getItem(name)
      
      if(value !== null) {
        return value;
      }
    } catch(e) {
      // error reading value
    }
  }

export async function LoginAction(user){
    //var authToken = await getData("authToken");
   try{
      console.log("User From Login Action",user);
    let data = await fetch(`${Base}auth/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        //'authorization': 'Bearer '+ authToken
      },
    });
    response = await data.json();
    console.log("response from Action" , response);
    if(response === false){
      return {
        type: 'loginOperation',
        payload: "Not Valid",
      }; 
    }else{
      await storeData(response.token, 'authToken');
      console.log(response.user);
      return {
        type: 'loginOperation',
        payload: response.user,
      };
    }
    }catch(e){
      
    }
}

export async function RegisterAction(newUser){
    // console.log("User From Register Action",newUser);
    // let data=await fetch("http://192.168.1.7:8888/api/Course",{
    //     method:"GET",
    // })
    // let x=await data.json();
   // let data = await fetch("http://192.168.1.7:3344/api/auth/register",{
        let data = await fetch(`${Base}auth/register`, {
          method: 'POST',
          body: JSON.stringify(newUser),
          headers: {'Content-Type': 'application/json'},
        });
    console.log("hellooooo")
    let x=await data.json();
    console.log(x)
    return {
        type:"registerOperation",
        payload:newUser
    }
}


export async function LogoutAction(){
    var authToken = await getData("authToken");
    console.log(authToken,"hopaa")
    let data = await fetch(`${Base}auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    response = await data.json();
    console.log(response);
    return {
        type:"logoutOperation",
        payload:response
    }
}

export const getCities = async () => {
  let payload = null;
  try {
    const response = await fetch(`${Base}city/getAllCities`, {
      method: 'get',
    });
    payload = await response.json();
  //  console.log(payload);
  } catch (err) {
    console.log(err);
  }

  return {
    type: "Cities_LIST",
    payload
  };
};