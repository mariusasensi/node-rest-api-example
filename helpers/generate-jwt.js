const jwt = require('jsonwebtoken');

/**
 * @param {string} uid 
 * @returns 
 */
const generateJWT = async(uid) => {
  return new Promise((resolve, reject) => {
    const payload = {uid};

    jwt.sign(payload, process.env.SECRETPRIVATEKEY, {
      expiresIn: '4h'
    }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    })
  });
}

module.exports = {
  generateJWT
}