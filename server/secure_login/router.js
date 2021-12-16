const express = require('express');

const jwtUtils = require('./jwtUtils.js');
const databaseUtils = require('./databaseUtils.js');

const router = express.Router();

const atob = (base64) => {
  return Buffer.from(base64, 'base64').toString('binary');
};

/**
 *  Verify User
 */
router.post('/verify_user/', jwtUtils.verifyLogin, (request, response, next) => {
  if (request.userData) {
    response.send({
      verified: true,
      message: 'Session Verification Successful',
      userName: request.userData.userName,
      userId: request.userData.userId
    });
  } else {
    response.status(401).send({
      verified: false,
      message: 'Session failed to verify! Token is invalid',
      userName: request.userData.userName,
      userId: request.userData.userId
    });
  }
});



/******************************************************************************/

/**
 *  Query Database - Secure
 */
router.post('/get_user_details/', jwtUtils.verifyLogin, (request, response, next) => {
  databaseUtils.getUserDetails().then(result => {
    response.set({ 'Content-Type': 'application/json' });                       // Response to be JSON format
    response.send(JSON.stringify(result));
  });
});



/******************************************************************************/
/**
 *  Check Email Exists
 */

router.post('/check_email/', (request, response, next) => {
  databaseUtils.checkEmailExists(request.body.email).then(result => {
    response.set({ 'Content-Type': 'application/json' });                       // Response to be JSON format
    response.send(JSON.stringify(result));
  });
});

/******************************************************************************/

/**
 *  Login
 */
router.post('/login/', async (request, response, next) => {

  // split at zero length characters preceeding ':'
  const authHeaderArray = atob(request.headers.authorization.split(' ')[1]).split(/(?<=:)/);
  // remove remaining ':' from emailAddress
  const emailAddress = authHeaderArray[0].split(':')[0];
  let password = authHeaderArray[1];
  // To join remaining ':' to password from authHeaderArray if any
  authHeaderArray.forEach((item, i) => {
    if (i >= 2) password += item;
  });

  const resolveLogin = verifiedObject => {
    const token = jwtUtils.generateNewToken(verifiedObject.result[0].username, verifiedObject.result[0].id);

    databaseUtils.setLastLoggedInTime(verifiedObject.result[0].id);

    response.send(JSON.stringify({
      verified: true,
      message: verifiedObject.message,
      jwt: token,
      user: verifiedObject.result[0],
      loggedInButWaitingToVerify: true
    }));
  };

  const rejectLogin = verifiedObject => {
    response.status(401).send(JSON.stringify({
      verified: false,
      message: 'Login unsuccessful: ' + verifiedObject.message
    }));
  };

  await databaseUtils.checkLoginDetails(emailAddress, password)
    .then(verifiedObject => {
      verifiedObject.success ? resolveLogin(verifiedObject) : rejectLogin(verifiedObject);
    });
});


/******************************************************************************/

/**
 * Register new user
 */

router.post('/register_new_user/', async (request, response, next) => {

  const verifiedUserDetailsObject = await databaseUtils.validateUserDetails(request.body.userDetails);
  if (verifiedUserDetailsObject.okayToSubmit) {
    verifiedUserDetailsObject.newUserDetails.password1.hash = await databaseUtils.hashPassword(verifiedUserDetailsObject.newUserDetails.password1.value);
    databaseUtils.addNewUser(verifiedUserDetailsObject.newUserDetails)
      .then(outcome => {
        if (outcome.err) {
          response.set({ 'Content-Type': 'application/json' });                          // Response to be JSON format
          response.send(JSON.stringify({
            serverMessage: `Form validation passed, ${outcome.message}`,
            err: true,
            newUserDetails: verifiedUserDetailsObject.newUserDetails
          }));
        } else {
          response.set({ 'Content-Type': 'application/json' });                          // Response to be JSON format
          response.send(JSON.stringify({
            serverMessage: `Success! ${outcome.message}`,
            err: false,
            newUserDetails: verifiedUserDetailsObject.newUserDetails
          }));
        }
      });
  } else {
    response.set({ 'Content-Type': 'application/json' });                          // Response to be JSON format
    response.send(JSON.stringify({
      serverMessage: 'Form validation failed!',
      err: true,
      newUserDetails: verifiedUserDetailsObject.newUserDetails
    }));
  }

});


/******************************************************************************/
/**
 * Delete User From Database
 */

router.post('/delete_user/', jwtUtils.verifyLogin, (request, response, next) => {
  databaseUtils.deleteUser(request.body.userId).then(result => {
    response.set({ 'Content-Type': 'application/json' });
    response.send(JSON.stringify(result));
  });
});

/******************************************************************************/

module.exports = router;
