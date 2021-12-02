const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('./db.js');
const jwtConfig = require('./jwtConfig.js');
const middleware = require('./middleware/verification.js');
const utils = require('./server_utils');

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

router.post('/check_email/', async (request, response, next) => {

  await utils.checkEmailExists(request.body.email)
    .then(result => {
      if (result.result) {
        response.set({ 'Content-Type': 'application/json' });                          // Response to be JSON format
        response.send(JSON.stringify(result));
      } else {
        response.send(JSON.stringify('Something went terribly wrong!!! ' + result));
      }
    });
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

/******************************************************************************/

/**
 * Register new user
 */

router.post('/register_new_user/', async (request, response, next) => {
  let okayToSubmit = true;

  const checkField = async (field, values = request.body.userDetails) => {
    // clone values object
    const newObject = JSON.parse(JSON.stringify({ ...values[field] }));

    /**
     *  Test functions:
     */
    // Each function will update the current (field)'s values in the newObject
    // according to the test results. The newObjects will be added to the
    // newUserDetails object field by field.
    const isRequired = (field) => {
      let error = false;
      if (values[field].required && !values[field].value) {
        newObject.error = true;
        newObject.message = 'This information is required to proceed';
        error = true;
        okayToSubmit = false;
      } else {
        newObject.error = false;
        newObject.message = '';
      }
      return error;
    };

    const matchesPassword1 = (field) => {
      let error = false;

      if (values[field].value !== values.password1.value) {
        newObject.error = true;
        newObject.message = 'Passwords do not match';
        error = true;
        okayToSubmit = false;
      } else {
        newObject.error = false;
        newObject.message = '';
      }
      return error;
    };

    const isPasswordStrongEnough = async (field) => {
      let error = false;
      const passwordCheckResult = utils.checkPasswordStrength(values[field].value);

      if (passwordCheckResult.isTooWeak) {
        newObject.error = true;
        newObject.message = passwordCheckResult.errorMessage;
        newObject.messageColor = 'red';
        error = true;
        okayToSubmit = false;
      } else {
        newObject.error = false;
        newObject.message = '';
        newObject.messageColor = 'red';
      }

      return error;
    };

    const isEmailFormat = (field) => {
      let error = false;
      if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values[field].value))) {
        newObject.error = true;
        newObject.message = 'You must enter a valid email address!';
        error = true;
        okayToSubmit = false;
      } else {
        newObject.error = false;
        newObject.message = '';
      }
      return error;
    };

    const isEmailTaken = async field => {
      let error = false;

      await utils.checkEmailExists(values[field].value).then(response => {
        if (response.result) {
          newObject.error = true;
          newObject.message = 'Email address is already taken';
          error = true;
          okayToSubmit = false;
        } else {
          newObject.error = false;
          newObject.message = '';
        }
      });

      return error;
    };

    const isUKPhoneNumberFormat = (field) => {
      let error = false;
      if (!(/^(?:0|\+?44)(?:\d\s?){9,10}$/.test(values[field].value)) && values[field].value.length > 0) {
        newObject.error = true;
        newObject.message = 'This is not a valid UK Phone Number!';
        error = true;
        okayToSubmit = false;
      } else {
        newObject.error = false;
        newObject.message = '';
      }
      return error;
    };

    const hasDatePickerThrownErrors = (field) => {
      let error = false;

      if (values[field].value && values[field].pickerErrorMessage) {
        newObject.error = true;
        newObject.message = values[field].pickerErrorMessage;
        error = true;
        okayToSubmit = false;
      } else {
        newObject.error = false;
        newObject.message = '';
      }
      return error;
    };

    // Allocate tests to fields
    switch (field) {
      case 'username':
        if (isRequired(field)) break;
        break;

      case 'email':
        if (isRequired(field)) break;
        if (isEmailFormat(field)) break;
        if (await isEmailTaken(field)) break;
        break;

      case 'phone':
        if (isUKPhoneNumberFormat(field)) break;
        break;

      case 'dob':
        if (hasDatePickerThrownErrors(field)) break;
        break;

      case 'address':
        break;

      case 'gender':
        break;

      case 'password1':
        if (isRequired(field)) break;
        if (await isPasswordStrongEnough(field)) break;
        break;

      case 'password2':
        if (isRequired(field)) break;
        if (matchesPassword1(field)) break;
        break;
    }

    return newObject;
  };

  // Need to perform a deep clone of the values object then update the state
  // hooks (setValues()) with the new object
  const newUserDetails = {};

  // Step through each field and build the new object
  for (const field in request.body.userDetails) {
    newUserDetails[field] = await checkField(field);
  };

  if (okayToSubmit) {
    console.log('User details passed validation: ', newUserDetails);
    response.set({ 'Content-Type': 'application/json' });                          // Response to be JSON format
    response.send(JSON.stringify({
      serverMessage: 'Validation checks passed, creating new user.',
      err: false,
      newUserDetails: newUserDetails
    }));
  } else {
    response.set({ 'Content-Type': 'application/json' });                          // Response to be JSON format
    response.send(JSON.stringify({
      serverMessage: 'Validation checks failed!',
      err: true,
      newUserDetails: newUserDetails
    }));
  }

});
