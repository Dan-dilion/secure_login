const express = require('express');
const router = express.Router();

const jwtUtils = require('./jwtUtils.js');
const databaseUtils = require('./databaseUtils.js');

/**
 *  Verify User
 */
router.post('/verify_user/', jwtUtils.verifyLogin, (request, response, next) => {
  if (request.userData) {
    console.log('user verified: true');
    response.send({
      verified: true,
      message: 'Session Verification Successful',
      userName: request.userData.userName,
      userId: request.userData.userId
    });
  } else {
    console.log('user varified: false');
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
    console.log('Login concluded positively: ', verifiedObject.message);
  };

  const rejectLogin = verifiedObject => {
    response.status(401).send(JSON.stringify({
      verified: false,
      message: 'Login unsuccessful: ' + verifiedObject.message
    }));
    console.log('Login concluded negatively: ', verifiedObject.message);
  };

  await databaseUtils.checkLoginDetails(request.body.emailAddress, request.body.password)
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

  const verifiedUserDetailsObject = await databaseUtils.validateUserDetails(request.body.userDetails);
  console.log('Usere Details Here: ', verifiedUserDetailsObject);
  if (verifiedUserDetailsObject.okayToSubmit) {
    verifiedUserDetailsObject.newUserDetails.password1.hash = await databaseUtils.hashPassword(verifiedUserDetailsObject.newUserDetails.password1.value);
    databaseUtils.addNewUser(verifiedUserDetailsObject.newUserDetails)
      .then(outcome => {
        if (outcome.err) {
          response.set({ 'Content-Type': 'application/json' });                          // Response to be JSON format
          response.send(JSON.stringify({
            serverMessage: `Validation passed, ${outcome.message}`,
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
      serverMessage: 'Validation failed!',
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
