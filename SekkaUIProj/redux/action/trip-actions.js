
export async function search(trip){
console.log("start actionssss")
    let data = await fetch('http://192.168.88.238:3344/api/trip/search', {
      method: 'POST',
      body: JSON.stringify(trip),
      headers: {'Content-Type': 'application/json'},
    });


    let response = await data.json();
console.log('actions',response);

    return {
     type: 'SearchOperation',
     payload: response,
    };
}