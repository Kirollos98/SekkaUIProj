const User = require('../Models/User');


const register = (req,res)=>{

    console.log(req.body);

    let userToAdd = new User({
        name:req.body.name,
        password: req.body.password,
        email: req.body.email,
        city: req.body.city
    })

    userToAdd.save((err,data)=>{
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

module.exports ={
    register
}