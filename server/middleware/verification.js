const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwtConfig.js');


const isLoggedIn = (req, res, next) => {
  // const token = req.headers.authorization.split(' ')[1];      // First part of the header is 'bearer'
  //
  // if (!token) {
  //   console.log('Verificatioin fail: No Token Provided!');
  //   return res.status(401).send({
  //     verified: false,
  //     msg: 'Your session is not valid'
  //   });
  // } else {
  //   jwt.verify(token, jwtConfig.secretKey, (err, decoded) => {
  //     if (err) {
  //       console.log('Verificatioin fail: Token Invalid!');
  //       return res.status(401).send({
  //         verified: false,
  //         msg: 'Your session is not valid'
  //       });
  //     } else {
  //       req.userData = { verified: true, user: decoded };
  //       console.log('User Validation Successful. Decoded user data: ' + JSON.stringify(req.userData));
  //       next();
  //     }
  //   });
  // }


  // This is the old method

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

module.exports = { isLoggedIn };
