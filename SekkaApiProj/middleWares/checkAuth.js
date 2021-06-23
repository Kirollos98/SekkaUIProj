const Token = require("../Models/Token");
const User = require("../Models/User");
const CustomError = require('../Models/customError');

const checkAuth = async (req, res, next) => {

  console.log(req.headers.authorization);
  const tokenId = req.headers.authorization.split(' ')[1];
  console.log(tokenId,"hona yarkod el token");
  if (!tokenId) {
    return next(new Error("Unauthorized"));
  }
  console.log("hona yarkod el token b3d awel IF");

  const token = await Token.findOne({_id:tokenId}).catch(err => {
    if(err){
      res.send(err)
    }
    //throw new CustomError(500, 'cannot find token');
  });
  console.log(token,"hona yarkod el token nafso mn el DB");

  if (!token || token.expiryDate <= Date.now()) {
    throw new CustomError(401, 'Unauthorized');
  }
  console.log(token,"hona yarkod el token b3d ma l7l 3adda mn el check");

  const user = await User.findById(token.userId).catch(err => {
    throw new CustomError(500);
  });
  console.log(user,"hona yarkod el User b3d ma gebnaa mn el Db");

  if (!user) {
    throw new CustomError(401, 'Unauthorized');
  }
  req.user = user;
  next();
};

module.exports = checkAuth;