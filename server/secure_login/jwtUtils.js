const jwt = require('jsonwebtoken');
const jwtConfig = require('./config/jwtConfig.js');

console.log('JWT Config: ', jwtConfig);

/**
 * Verify Logged In User
 */
const verifyLogin = (req, res, next) => {
  try {
    console.log('MiddleWare - headers', req.headers);
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(
      token,
      jwtConfig.secretKey
    );
    req.userData = { verified: true, user: decoded };
    next();
  } catch (err) {
    return res.status(401).send({
      verified: false,
      msg: 'Your session is not valid!'
    });
  }
};

/******************************************************************************/

/**
 * Generate New Token
 */
const generateNewToken = (username, id) => {
  return jwt.sign(
    {
      userName: username,          // These variables will be accessible
      userId: id                   // in the protected routes
    },
    jwtConfig.secretKey,
    jwtConfig.options
  );
};

module.exports = { verifyLogin, generateNewToken };
