const City = require('../Models/City');

const getAllCities = async (req, res, next) => {
    res.send(
      await City.find({})
    );
  };

const addCity = (req,res)=>{
    let cityToAdd = new City({
        cityName:req.body.cityName,
    })



    cityToAdd.save((err,data)=>{

        if(err){

            console.log(err);

            err.statusCode=422;

            //next(err); 

            res.send(err);     

        }

        else{

            res.status(200).send(data);

        }

    });
    
}

module.exports = {
    addCity,
    getAllCities
}