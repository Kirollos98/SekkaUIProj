const User = require('../Models/User');


const register = (req,res)=>{

    console.log(req.body,"bodyy");

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

const login = (req,res)=>{

    console.log(req.body);

    let userToAdd = new User({
        name:req.body.name,
        password: req.body.password,
       
    })
    User.find({},(err,users)=>{
        var flag=false
        users.forEach(element => {
            if(element.name==req.body.name&&element.password==req.body.password)
            {
                res.send(element);
                flag=true;
            }
        });
        if(err||flag==false)
        {
            err.statusCode=422;
            //next(err); 
            res.send(err); 
        }
    })
    // userToAdd.save((err,data)=>{
    //     if(err){
    //         console.log(err);
    //         err.statusCode=422;
    //         //next(err); 
    //         res.send(err);     
    //     }
    //     else{
    //         res.status(200).send(data);
    //     }
    // });
}

module.exports ={
    register,login
}