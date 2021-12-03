const express = require('express');
const router = express.Router();

const jwtUtils = require('./jwtUtils.js');
const serverUtils = require('./serverUtils');
const databaseAccess = require('./databaseAccess.js');

/**
 *  Verify User
 */
router.post('/verify_user/', jwtUtils.verifyLogin, (request, response, next) => {
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
router.post('/get_user_details/', jwtUtils.verifyLogin, (request, response, next) => {
  databaseAccess.getUserDetails().then(result => {
    response.set({ 'Content-Type': 'application/json' });                       // Response to be JSON format
    response.send(JSON.stringify(result));
  });
});



/******************************************************************************/
/**
 *  Check Email Exists
 */

router.post('/check_email/', (request, response, next) => {
  databaseAccess.checkEmailExists(request.body.email).then(result => {
    response.set({ 'Content-Type': 'application/json' });                       // Response to be JSON format
    response.send(JSON.stringify(result));
  });
});

/******************************************************************************/

/**
 *  Login
 */
router.post('/login/', async (request, response, next) => {
  const resolveLogin = verifiedObject => {
    const token = jwtUtils.generateNewToken(verifiedObject.result[0].username, verifiedObject.result[0].id);

    databaseAccess.setLastLoggedInTime(verifiedObject.result[0].id);

    response.send(JSON.stringify({
      verified: true,
      msg: verifiedObject.message,
      jwt: token,
      user: verifiedObject.result[0],
      loggedInButWaitingToVerify: true
    }));
    console.log('Login concluded positively: ', verifiedObject.message);
  };

  const rejectLogin = verifiedObject => {
    response.status(401).send(JSON.stringify({
      loginSuccess: false,
      msg: 'Login unsuccessful: ' + verifiedObject.message
    }));
    console.log('Login concluded negatively: ', verifiedObject.message);
  };

  await databaseAccess.checkLoginDetails(request.body.userName, request.body.password)
    .then(verifiedObject => {
      verifiedObject.success ? resolveLogin(verifiedObject) : rejectLogin(verifiedObject);
    });
});

module.exports = router;

/******************************************************************************/

/**
 * Register new user
 */

router.post('/register_new_user/', async (request, response, next) => {

  const verifiedUserDetailsObject = await serverUtils.checkUserDetails(request.body.userDetails);

  if (verifiedUserDetailsObject.okayToSubmit) {
    console.log('User details passed validation: ', verifiedUserDetailsObject.newUserDetails);
    response.set({ 'Content-Type': 'application/json' });                          // Response to be JSON format
    response.send(JSON.stringify({
      serverMessage: 'Validation checks passed, creating new user.',
      err: false,
      newUserDetails: verifiedUserDetailsObject.newUserDetails
    }));
  } else {
    response.set({ 'Content-Type': 'application/json' });                          // Response to be JSON format
    response.send(JSON.stringify({
      serverMessage: 'Validation checks failed!',
      err: true,
      newUserDetails: verifiedUserDetailsObject.newUserDetails
    }));
  }

});
