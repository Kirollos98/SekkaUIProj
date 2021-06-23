import AsyncStorage from "@react-native-async-storage/async-storage";

  const Base = 'http://192.168.1.117:3344/api/trip/';

const storeData = async (value,name) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStoragerage.setItem(name, jsonValue)
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


export async function search(trip){
console.log("start actionssss")
    let data = await fetch(`${Base}search`, {
      method: 'POST',
      body: JSON.stringify(trip),
      headers: {'Content-Type': 'application/json'},
    });


    let response = await data.json();
console.log('actions',response);

    let newList = response.filter((item)=>{
      console.log("from trip obj ",trip.date)
      console.log('from backend ', item.date.split('T')[0]);
      return item.date.split("T")[0] == trip.date
    })

    console.log('hena yarkod el action filter ,,,,,,', newList);

    return {
      type: 'SearchOperation',
      payload: newList,
    };
}


export async function getTripDetial(tripID){

  let data = await fetch(`${Base}detailTrip/${tripID}`);

  let response = await data.json();
  console.log(response,"from details");

  return{
    type:"Trip_Details",
    payload:response
  }
}

export async function proceedToPayment(detailsNeededFormPayment){
  console.log("el details el m7tagenha ",detailsNeededFormPayment);
  return{
    type:"Details-Needed",
    payload:detailsNeededFormPayment
  }
  // return{
  //   type:"Trip-Booking",
  //   payload:response
  // }
}

export async function bookTrip(bookingDetails){
  let user  = await getData("loggedUser");
  let parseUser = await JSON.parse(user);
  console.log(user,'user gowa el  7agz');
  bookingDetails.userId = parseUser._id; 
  console.log(bookingDetails,'details gowa el  7agz b3d edaft el userId');

  let data = await fetch(`${Base}bookingTrip`,{
    method:"POST",
    body:JSON.stringify(bookingDetails),
    headers: {
      'Content-Type': 'application/json',
      //'authorization': 'Bearer '+ authToken
    },
  })

  let response = await data.json();
  console.log(response);
  return{
    type:"Trip-Booking",
    payload:response
  }
}
