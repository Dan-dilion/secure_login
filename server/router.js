const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const owasp = require('owasp-password-strength-test');

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
 *  Query Database - Secure
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
  const resolveQuery = (output) => {
    response.set({ 'Content-Type': 'application/json' });                          // Response to be JSON format
    response.send(JSON.stringify({ verified: true, results: output }));
  };

  const rejectQuery = (output) => {
    response.set({ 'Content-Type': 'application/json' });
    response.send(JSON.stringify('Something went terribly wrong!!! ' + output));
  };

  const queryDatabase = (query) => new Promise((resolve, reject) => {
    db.query(query, (err, result, fields) => {
      if (err) {
        reject(new Error('Database Error!!! ' + err));
      } else {
        resolve(result);
      }
    });
  });

  queryDatabase(statement).then(resolveQuery, rejectQuery);
});



/******************************************************************************/
/**
 *  Check Email Exists
 */

router.post('/check_email/', (request, response, next) => {
  const checkEmailQuery = 'SELECT * FROM node_login.users WHERE email = ?';

  const resolveQuery = result => {
    response.set({ 'Content-Type': 'application/json' });                          // Response to be JSON format
    response.send(JSON.stringify({ result: result.length > 0 }));
  };

  const rejectQuery = result => {
    response.send(JSON.stringify('Something went terribly wrong!!! ' + result));
  };

  const queryDatabase = query => new Promise((resolve, reject) => {
    db.query(query, [request.body.email], (err, result, fields) => {
      if (err) {
        reject(new Error('Database Error!!! ' + err));
      } else {
        resolve(result);
      }
    });
  });

  queryDatabase(checkEmailQuery).then(resolveQuery, rejectQuery);
});

/******************************************************************************/

/**
 * Check Password Strength
 */

 /**
  *  Password Tests:
  *  0 - (Required) Must be above min length
  *  1 - (Required) Must be below max length
  *  2 - (Required) Forbid repeating letters (3 or more)
  *  3 - (Optional) Must have at least 1 lowercase letter
  *  4 - (Optional) Must have at least 1 uppercase letter
  *  5 - (Optional) Must have at least 1 number
  *  6 - (Optional) Must have at least 1 special character
  */

router.post('/check_password_strength/', (request, response, next) => {

  const returnObject = {
    isTooWeak: true,
    errorMessage: ''
  };

  owasp.config({
    allowPassphrases: true,
    maxLength: 128,   // Protect against long password DDOS attack
    minLength: 8,
    minPhraseLength: 20,
    minOptionalTestsToPass: 4
  });

  const testResults = owasp.test(request.body.password);

  const optionalTestMessage = () => {
    let testCount = 0;
    let message = 'Password is too weak, try adding';

    const appendMessage = addition => {
      message += `${testCount > 1 ? ' or ' : ''} a`;
      message += addition;
    };

    if (!testResults.passedTests.includes(3)) {
      testCount++;
      appendMessage(' lowercase letter');
    }
    if (!testResults.passedTests.includes(4)) {
      testCount++;
      appendMessage('n uppercase letter');
    }
    if (!testResults.passedTests.includes(5)) {
      testCount++;
      appendMessage(' number');
    }
    if (!testResults.passedTests.includes(6)) {
      testCount++;
      appendMessage(' special character');
    }

    return message;
  };

  if (testResults.requiredTestErrors.length > 0) {
    returnObject.errorMessage = testResults.requiredTestErrors[0];
  } else if (testResults.optionalTestsPassed <= 2) {
    returnObject.errorMessage = optionalTestMessage();
  } else {
    returnObject.isTooWeak = false;
  }

  response.set({ 'Content-Type': 'application/json' });                          // Response to be JSON format
  response.send(JSON.stringify(returnObject));
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
