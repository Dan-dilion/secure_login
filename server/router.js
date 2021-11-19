const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('./db.js');
const jwtConfig = require('./jwtConfig.js');
const middleware = require('./middleware/verification.js');

console.log('JWT Config: ', jwtConfig);

/**
 *  Verify User
 */
router.post('/verify_user/', middleware.isLoggedIn, (request, response, next) => {
  if (request.userData) {
    console.log('user verified: true');
    response.send({
      verified: true,
      msg: 'Session Verification Successful',
      userName: request.userData.userName,
      userId: request.userData.userId
    });
  } else {
    console.log('user varified: false');
    response.status(401).send({
      verified: false,
      msg: 'Session failed to verify! Token is invalid',
      userName: request.userData.userName,
      userId: request.userData.userId
    });
  }
});



/******************************************************************************/

/**
 *  Query Database
 */
router.post('/query_DB/', middleware.isLoggedIn, (request, response, next) => {

  let statement = '';
  switch (request.body.query) {
    case 'get_user_details':
      statement = 'SELECT id, username, password, email FROM node_login.users';
      break;
    default: break;
  }

  // POST parameters are accessible via the request object
  console.log(JSON.stringify(statement));

  console.log('1 -- query_DB Request triggered');

  // The post response is sent in as a call back for the sql query promise
  const resolveQuery = (output) => {
    response.set({ 'Content-Type': 'application/json' });                          // Response to be JSON format
    response.send(JSON.stringify({ verified: true, results: output }));
    console.log('3 -- This promise has been concluded Positively: \nResults: ', JSON.stringify(output));
  };

  const rejectQuery = (output) => {
    response.set({ 'Content-Type': 'application/json' });
    response.send(JSON.stringify('Something went terribly wrong!!! ' + output));
    console.log('3 -- This promise has been concluded negatively: ', JSON.stringify(output));
  };

  // queryDatabase returns a promise allowing the usage of the .then() method,
  // resolve and reject are passed in to the .then() statement
  const queryDatabase = (query) => new Promise((resolve, reject) => {
    db.query(query, (err, result, fields) => {
      if (err) {
        console.log('2 -- DB Error!', err);
        reject(new Error('Database Error!!! ' + err));
      } else { console.log('2 -- all good'); resolve(result); }
    });
  });

  queryDatabase(statement).then(resolveQuery, rejectQuery);
});




/******************************************************************************/

/**
 *  Login
 */
router.post('/login/', (request, response, next) => {
  // notice the placeholder for the string "?".
  // This is so we can escape the characters when the query is called
  const loginQuery = `SELECT * from node_login.users
    where username = ?;
  `;

  // Login details match
  const resolveLogin = (queryResult) => {
    // Generate JSON Web Token
    const token = jwt.sign(
      {
        userName: queryResult[0].username,          // These variables will be accessible
        userId: queryResult[0].id                   // in the protected routes
      },
      jwtConfig.secretKey,
      jwtConfig.options
    );

    // Update login time in DB
    db.query(`UPDATE users SET datelastlogin = now() WHERE id = '${queryResult[0].id}'`);

    // POST response
    response.send(JSON.stringify({
      verified: true,
      msg: 'Login Success!!!',
      jwt: token,
      user: queryResult[0],
      loggedInButWaitingToVerify: true
    }));

    console.log('Login concluded positively');
  };

  // Login details do not match or error
  const rejectLogin = (output) => {
    response.status(401).send(JSON.stringify({
      loginSuccess: false,
      msg: 'Login unsuccessful: ' + output
    }));
    console.log('Login concluded negatively: ', JSON.stringify(output));
  };


  // promise to query database and compare password hash
  const checkLogin = (userName, password) => new Promise((resolve, reject) => {
    // The array in the second input is for the placeholder in the query, this escapes special chars
    db.query(loginQuery, [request.body.userName], (err, queryResult, fields) => {
      if (err) {
        console.log('DB Error: ', err);
        reject(new Error('DB Error: ' + err));
        return;
      }

      if (queryResult.length === 0) {
        console.log('Login Error: No such user name');
        reject(new Error('Username or Password Incorrect!'));
      } else {
        bcrypt.compare(password, queryResult[0].password, (bcryptErr, bcryptResult) => {
          // Wrong Username
          if (bcryptErr) {
            // throw (bcryptErr);
            reject(new Error('Username Or Password Incorrect!!!' + bcryptErr));
          }

          // Successful Password Comparison
          if (bcryptResult) {
            resolve(queryResult);
          } else {
            console.log('Password incorrect!');
            reject(new Error('Username Or Password Incorrect!!!'));
          };
        });
      }
    });
  });

  checkLogin(request.body.userName, request.body.password).then(resolveLogin, rejectLogin);
});

module.exports = router;
