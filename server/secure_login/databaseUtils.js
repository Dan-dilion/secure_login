const owasp = require('owasp-password-strength-test');
const bcrypt = require('bcryptjs');

const connectionPool = require('./config/dbConfig.js');
// const db = {};

const prefix = connectionPool.customOptions.prefix;
const database = connectionPool.config.connectionConfig.database;


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
const checkPasswordStrength = (pwd) => {
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

  const testResults = owasp.test(pwd);

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

  return returnObject;
};

/******************************************************************************/

/**
 * Compare Password Hash
 */
const comparePasswordHash = async (password, hash) => {

  return await bcrypt.compare(password, hash).then(response => {
    let returnObject = {
      success: false,
      errorMessage: ''
    };

    // Wrong Username
    response
      ? returnObject = { success: true, message: 'Username and password accepted' }
      : returnObject = { success: false, message: 'Username Or Password Incorrect!' };

    return returnObject;
  });
};

/******************************************************************************/
/**
 * Hash Password
 */

const hashPassword = password => {
  return bcrypt.hash(password, 10).then(hash => hash);
};


/******************************************************************************/
/**
 * Check Fields Integrity
 */
//
const validateUserDetails = async userDetails => {

  const returnObject = {
    okayToSubmit: true,
    newUserDetails: {}
  };

  const checkField = async (field, userDetails) => {
    // clone values object
    const newObject = JSON.parse(JSON.stringify({ ...userDetails[field] }));

    /**
     *  Test functions:
     */
    // Each function will update the current (field)'s values in the newObject
    // according to the test results. The newObjects will be added to the
    // newUserDetails object field by field.
    const isRequired = (field) => {
      let error = false;
      if (userDetails[field].required && !userDetails[field].value) {
        newObject.error = true;
        newObject.message = 'This information is required to proceed';
        error = true;
        returnObject.okayToSubmit = false;
      } else {
        newObject.error = false;
        newObject.message = '';
      }
      return error;
    };

    const matchesPassword1 = (field) => {
      let error = false;

      if (userDetails[field].value !== userDetails.password1.value) {
        newObject.error = true;
        newObject.message = 'Passwords do not match';
        error = true;
        returnObject.okayToSubmit = false;
      } else {
        newObject.error = false;
        newObject.message = '';
      }
      return error;
    };

    const isPasswordStrongEnough = async (field) => {
      let error = false;
      const passwordCheckResult = checkPasswordStrength(userDetails[field].value);

      if (passwordCheckResult.isTooWeak) {
        newObject.error = true;
        newObject.message = passwordCheckResult.errorMessage;
        newObject.messageColor = 'red';
        error = true;
        returnObject.okayToSubmit = false;
      } else {
        newObject.error = false;
        newObject.message = '';
        newObject.messageColor = 'red';
      }

      return error;
    };

    const isEmailFormat = (field) => {
      let error = false;
      if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userDetails[field].value))) {
        newObject.error = true;
        newObject.message = 'You must enter a valid email address!';
        error = true;
        returnObject.okayToSubmit = false;
      } else {
        newObject.error = false;
        newObject.message = '';
      }
      return error;
    };

    const isEmailTaken = async field => {
      let error = false;

      await checkEmailExists(userDetails[field].value).then(response => {
        if (!response.err) {
          if (response.result) {
            newObject.error = true;
            newObject.message = 'Email address is already taken';
            error = true;
            returnObject.okayToSubmit = false;
          } else {
            newObject.error = false;
            newObject.message = '';
          }
        } else {
          newObject.error = true;
          newObject.message = response.errMessage;
        }
      });

      return error;
    };

    const isUKPhoneNumberFormat = (field) => {
      let error = false;
      if (!(/^(?:0|\+?44)(?:\d\s?){9,10}$/.test(userDetails[field].value)) && userDetails[field].value.length > 0) {
        newObject.error = true;
        newObject.message = 'This is not a valid UK Phone Number!';
        error = true;
        returnObject.okayToSubmit = false;
      } else {
        newObject.error = false;
        newObject.message = '';
      }
      return error;
    };

    const hasDatePickerThrownErrors = (field) => {
      let error = false;

      if (userDetails[field].value && userDetails[field].pickerErrorMessage) {
        newObject.error = true;
        newObject.message = userDetails[field].pickerErrorMessage;
        error = true;
        returnObject.okayToSubmit = false;
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

  for (const field in userDetails) {
    returnObject.newUserDetails[field] = await checkField(field, userDetails);
  };

  return returnObject;
};


/******************************************************************************/
/**
 * Check Login Details
 */

const checkLoginDetails = async (emailAddress, password) => {
  console.log(`Attempting login with email: ${emailAddress} and password: ${password}`);
  const statement = `SELECT * FROM ${database}.${prefix}users WHERE email = ?;`;

  const queryDatabase = query => new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        console.log('DB connection failed: ', err);
        reject(new Error('DB connection failed: ' + err));
      }

      connection.query(query, [emailAddress], (err, result, fields) => {
        if (err) {
          console.log('DB query failed: ', err);
          reject(new Error('DB query failed: ' + err.code + ': ' + err.sqlMessage));
        } else resolve(result);
      });

      connection.release();
      if (err) {
        console.log('DB connection release error: ', err);
        reject(new Error('DB connection release error: ' + err));
      }
    });
  });

  return await queryDatabase(statement)
    .then(async result => {
      if (result.length > 0) {
        const verifyPasswordHashResults = await comparePasswordHash(password, result[0].password);
        return { ...verifyPasswordHashResults, result: result };
      } else return { success: false, message: 'Email or Password Incorrect!', result: [] };
    })
    .catch(error => ({ success: false, message: error.toString() }));
};

/******************************************************************************/

/**
 * Set Last Logged In Time & Date
 */

const setLastLoggedInTime = id => {
  try {
    connectionPool.getConnection((err, connection) => {
      if (err) throw new Error('DB connection failed: ' + err);

      connection.query(`UPDATE ${database}.${prefix}users SET datelastlogin = now() WHERE id = '${id}'`, (err, result, fields) => {
        if (err) throw new Error('DB query error - failed to set datelastlogin: ' + err.code + ': ' + err.sqlMessage);
      });

      connection.release();
      if (err) throw new Error('DB connection release error: ' + err);
    });
  } catch (err) {
    console.log('An error occurred while attempting to update datelastlogin: ', err);
  }
};


/******************************************************************************/

/**
 * Check database for email address
 */

const checkEmailExists = email => {
  const checkEmailQuery = `SELECT * FROM ${database}.${prefix}users WHERE email = ?`;

  const queryDatabase = query => new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        console.log('DB connection failed: ', err);
        reject(new Error('DB connection failed: ' + err));
      }

      connection.query(query, [email], (err, result, fields) => {
        if (err) {
          console.log('DB query failed: ', err);
          reject(new Error('DB query failed: ' + err.code + ': ' + err.sqlMessage));
        } else resolve(result);
      });

      connection.release();
      if (err) {
        console.log('DB connection release error: ', err);
        reject(new Error('DB connection release error: ' + err));
      }
    });
  });

  return queryDatabase(checkEmailQuery)
    .then(result => result.length > 0
      ? ({ result: true, err: false })
      : ({ result: false, err: false })
    )
    .catch(error => ({ err: true, errMessage: error.toString() }));
};

/******************************************************************************/
/**
 * Delete User From Database
 */

const deleteUser = (userId) => {
  const statement = `DELETE FROM ${database}.${prefix}users WHERE id = ?;`;

  const queryDatabase = query => new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        console.log('DB connection failed: ', err);
        reject(new Error('DB connection failed: ' + err));
      }

      connection.query(query, [userId], (err, result, fields) => {
        if (err) {
          console.log(`Attempting to delete user ${userId} - DB query failed: `, err);
          reject(new Error(`DB query failed - ${err.code}: ${err.sqlMessage}`));
        } else if (result.affectedRows < 1) {
          console.log(`Attempting to delete user ${userId} - DB Error - No affected rows!`);
          reject(new Error('DB Error - No affected rows!'));
        } else resolve(result);
      });

      connection.release();
      if (err) {
        console.log('DB connection release error: ', err);
        reject(new Error('DB connection release error: ' + err));
      }
    });

  });

  return queryDatabase(statement)
    .then(result => ({ verified: true, error: false, message: `${result.affectedRows} users deleted from database`, results: result }))
    .catch(error => ({ verified: true, error: true, message: error.toString() }));
};

/******************************************************************************/

/**
 * Get User Details
 */

const getUserDetails = () => {
  const statement = `SELECT id, username, email, password, phone, address, dob, gender, datecreated, datelastlogin FROM ${database}.${prefix}users`;

  const queryDatabase = query => new Promise((resolve, reject) => {

    connectionPool.getConnection((err, connection) => {
      if (err) {
        console.log('DB connection failed: ', err);
        reject(new Error('DB connection failed: ' + err));
      }

      connection.query(query, (err, result, fields) => {
        if (err) {
          console.log('DB query failed - ', err);
          reject(new Error('DB query failed - ' + err.code + ': ' + err.sqlMessage));
        } else resolve(result);
      });

      connection.release();
      if (err) {
        console.log('DB connection release error: ', err);
        reject(new Error('DB connection release error: ' + err));
      }
    });

  });

  return queryDatabase(statement)
    .then(result => ({ verified: true, error: false, results: result }))
    .catch(error => ({ verified: true, error: true, message: error.toString() }));
};

/******************************************************************************/
/**
 * Add New User Details
 */

const addNewUser = (details) => {
  const statement = `INSERT INTO ${database}.${prefix}users(username, email, password, phone, address, dob, gender) VALUES (?, ?, ?, ?, ?, ?, ?);`;

  const queryDatabase = query => new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        console.log('DB connection failed: ', err);
        reject(new Error('DB connection failed: ' + err));
      }

      connection.query(query, [
        details.username.value,
        details.email.value,
        details.password1.hash,
        details.phone.value ? details.phone.value : null,
        details.address.value ? details.address.value : null,
        details.dob.value ? details.dob.value : null,
        details.gender.value ? details.gender.value : null
      ], (err, result, fields) => {
        if (err) {
          console.log('DB query error!: ', err);
          reject(new Error(`DB query error!: ${err.code}: ${err.sqlMessage}`));
        } else resolve(result);
      });

      connection.release();
      if (err) {
        console.log('DB connection release error: ', err);
        reject(new Error('DB connection release error: ' + err));
      }
    });

  });

  return queryDatabase(statement)
    .then(response => ({ err: false, message: 'User registration complete' }))
    .catch(error => ({ err: true, message: `An error occurred while adding users to the database: ${error}` }));
};


module.exports = {
  comparePasswordHash,
  hashPassword,
  validateUserDetails,
  checkLoginDetails,
  setLastLoggedInTime,
  checkEmailExists,
  deleteUser,
  getUserDetails,
  addNewUser
};
