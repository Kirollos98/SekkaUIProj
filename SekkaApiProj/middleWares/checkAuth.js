const Token = require("../Models/Token");
const User = require("../Models/User");
const CustomError = require('../Models/customError');

const checkAuth = async (req, res, next) => {

  const tokenId = req.headers.authorization.split(" ")[1];
  console.log(tokenId,"hona yarkod el token");
  if (!tokenId) {
    return next(new CustomError(401, 'Unauthorized'));
  }
  const token = await Token.findById(tokenId).catch(err => {
    throw new CustomError(500, 'cannot find token');
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