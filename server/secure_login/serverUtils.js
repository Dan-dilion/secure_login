const owasp = require('owasp-password-strength-test');
const bcrypt = require('bcryptjs');


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


module.exports = {
  checkPasswordStrength,
  comparePasswordHash,
  hashPassword
};
