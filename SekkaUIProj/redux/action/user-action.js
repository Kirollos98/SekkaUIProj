import AsyncStorage from '@react-native-async-storage/async-storage';

const Base = 'http://192.168.1.162:3344/api/user/';

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

export async function getUserData(){
    let user = await getData('loggedUser');
    let parseUser = await JSON.parse(user);
    //console.log("parsed user ya naaas",parseUser);
    return{
        type:"User-Data",
        payload:parseUser
    }
}

export async function editUserData(newData){
   
     let data = await fetch(`${Base}editUser`,{
         method:"PUT",
         body:JSON.stringify(newData),
         headers:{
            'Content-Type': 'application/json',
         }
     });

     let response = await data.json();

     console.log("el response reg3", response);
     await storeData(response,"loggedUser");
    return{
        type:"User-Data-Edit",
        payload:response
    }
}


export async function addComplain(newComplain){
    let user = await getData('loggedUser');
    let parseUser = await JSON.parse(user);
    newComplain.userId = parseUser._id;
    console.log("complain action ============", newComplain);

    let data = await fetch(`${Base}add-complain`,{
        method:"POST",
        body:JSON.stringify(newComplain),
        headers:{
            'Content-Type': 'application/json',
         }
    })

    let response = await data.json();
    console.log("after getting back",response);

    return{
        type:"Adding-Complain",
        payload:response
    }
}