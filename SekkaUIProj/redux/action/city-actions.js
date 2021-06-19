export const getCities = async () => {
    let payload = null;
    try {
      const response = await fetch(`http://192.168.88.57:3344/api/city/getAllCities`,{
        method:"get"});
      payload = await response.json();
      console.log(payload);
    } catch (err) {
      console.log(err);
    }
  
    return {
      type: "Cities_LIST",
      payload
    };
  };