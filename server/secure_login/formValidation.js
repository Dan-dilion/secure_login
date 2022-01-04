const serverUtils = require('./serverUtils.js');
const databaseAccess = require('./databaseAccess.js');


/******************************************************************************/
/**
 * Validate form object fields
 */

const validateUserDetails = async userDetails => {
  const returnObject = {
    okayToSubmit: true,
    newUserDetails: {}
  };

  const checkField = async (field, userDetails) => {
    // clone values object
    const newObject = JSON.parse(JSON.stringify({ ...userDetails[field] }));

    /**
     *  Validation functions:
     *
     *  Each function will update the current (field)'s values in the newObject
     *  according to the test results. The newObjects will be added to the
     *  newUserDetails object field by field.
     */

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
      const passwordCheckResult = serverUtils.checkPasswordStrength(userDetails[field].value);

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

      await databaseAccess.checkEmailExists(userDetails[field].value).then(response => {
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

    /**
     *  Allocate validation functions to fields
     *
     *  The validation functions break after each one is executed so insert them
     *  in priority order.
     */

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

  /**
   *  Main validation Loop
   *
   *  Step through each field and run tests
   */

  for (const field in userDetails) {
    returnObject.newUserDetails[field] = await checkField(field, userDetails);
  };

  /**
   *  Return new object with validation results
   */

  return returnObject;
};

module.exports = {
  validateUserDetails
};
