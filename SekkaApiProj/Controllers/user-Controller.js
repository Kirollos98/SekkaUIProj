const User = require('../Models/User');
const Complain = require('../Models/Complain');

const editDetails = async (req,res)=>{
    console.log("body----",req.body);


    User.updateOne({email:req.body.email},{name:req.body.name,city:req.body.city},(err,updated)=>{
        if(err){
            res.send(err);
        }else{
            console.log("updated ========",updated);

            User.findOne({email:req.body.email},(err,user)=>{
                if(err){
                   res.send(err) 
                }else{
                    console.log("updated ========",user);

                    res.send(user);
                }
            })
        }
    })
}

const addComplain = async (req,res) => {
    console.log("body ===================>",req.body);


    let newComplain = new Complain({
        userId:req.body.userId,
        tripId:req.body.tripId,
        complain:req.body.complain,
    })

    newComplain.save((err,data)=>{
        if(err){
            res.status(400).send({done:false,error:err});
        }else{
            res.status(200).send({done:true,complain:data});
        }
    })
}


module.exports ={
    editDetails,
    addComplain
}