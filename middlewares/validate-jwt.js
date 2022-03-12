const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * @param {Request} request 
 * @param {Response} response 
 * @param {*} next 
 * @returns 
 */
const validateJWT = async(request, response, next) => {
  const token = request.header('x-token');
  if (!token) {
    return response.status(401).json('Unauthorized');
  }

  try {
    const {uid} = jwt.verify(token, process.env.SECRETPRIVATEKEY);
    request.user = await User.findById(uid);
    if (!request.user.status) {
      throw Error('User is status false');
    }
    
    next();
  } catch (error) {
    return response.status(401).json('Unauthorized');
  }
}

module.exports = {validateJWT};