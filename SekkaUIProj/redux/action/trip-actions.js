
export async function search(trip){
console.log("start actionssss")
    let data = await fetch('http://192.168.176.1:3344/api/trip/search', {
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

  let data = await fetch(
    `http://192.168.176.1:3344/api/trip/detailTrip/${tripID}`
  );

  let response = await data.json();
  console.log(response,"from details");

  return{
    type:"Trip_Details",
    payload:response
  }
}
