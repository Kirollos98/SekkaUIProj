const User = require('../Models/User');

var bcrypt = require('bcrypt');
const salt = 8;
const register = (req,res)=>{

    console.log(req.body,"bodyy");
    bcrypt.hash(req.body.password,salt,(err,hash)=>{
        //console.log(typeof hash);
        let userToAdd = new User({
            name:req.body.name,
            password: hash,
            email: req.body.email,
            city: req.body.city
        })
    
        userToAdd.save((err,data)=>{
            if(err){
                console.log(err);
                err.statusCode=422;
                res.send(err);     
            }
            else{
                res.status(200).send(data);
            }
        });
    })
    
}

const login = (req,res)=>{

    console.log(req.body);

    // let userToAdd = new User({
    //     name:req.body.name,
    //     password: req.body.password,
       
    // })


    User.findOne({name:req.body.name},(err,user)=>{
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, done) => {
                res.send(done);
            })

        }
        else {
            res.send(false);
        }
    })

    // User.find({},(err,users)=>{
    //     var flag=false
    //     users.forEach(element => {
    //         if(element.name==req.body.name&&element.password==req.body.password)
    //         {
    //             res.send(element);
    //             flag=true;
    //         }
    //     });
    //     if(err||flag==false)
    //     {
    //         err.statusCode=422;
    //         //next(err); 
    //         res.send(err); 
    //     }
    // })
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
    register,
    login
}