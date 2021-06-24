const User = require('../Models/User');
const Token = require('../Models/Token');

var bcrypt = require('bcrypt');
const salt = 8;
const register = (req,res)=>{
    //req.header
    console.log(JSON.stringify(req.headers),"peeeeep");
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
                res.send(false);     
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


    User.findOne({email:req.body.email},(err,user)=>{
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, done) => {
                if(done === true){
                  const _expiryDate = new Date(
                    Date.now() + 30 * 24 * 3600 * 1000
                  );
                  var token = new Token({
                    userId: user._id,
                    expiryDate: _expiryDate,
                  });
                  token.save((err, data) => {
                    console.log({done, user});
                    res.send({done, token: token._id, user});
                  });
                }else{
                    res.send(false);
                }

                if (err) {
                  res.send(err);
                }
            })
            
        }
        else {
          console.log("eeee")
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

const logout = async (req, res, next) => {
    //const tokenId = req.cookies.token;
    const tokenId = req.headers.authorization.split(' ')[1];
    console.log(tokenId,"hena yarkod el token mn el logout");
    await Token.findOneAndRemove({ _id: tokenId }).catch(() => {
      throw new CustomError(500);
    });
    //res.clearCookie('token');
    res.send('logged out successfully');
  };
  

module.exports ={
    register,
    login,
    logout
}