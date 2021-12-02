import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@material-ui/styles';
import owasp from 'owasp-password-strength-test';

import { checkEmail } from '../../server_requests/queryDatabase.js';
import { checkPassword } from '../../server_requests/securityRequests.js';
import { setLoginOrRegister } from '../../App/AppSlice.js';
import useStyles from './RegisterStyle.js';

const RegisterLogic = ({ ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const defaultValues = {
    username: {
      value: '',
      error: false,
      message: '',
      required: true
    },
    email: {
      value: '',
      error: false,
      message: '',
      required: true
    },
    phone: {
      value: '',
      error: false,
      message: '',
      required: false
    },
    dob: {
      value: null,
      error: false,
      message: '',
      pickerErrorMessage: '',
      required: false
    },
    address: {
      value: '',
      error: false,
      message: '',
      required: false
    },
    gender: {
      value: '',
      error: false,
      message: '',
      required: false
    },
    password1: {
      value: '',
      error: false,
      message: '',
      messageColor: theme.palette.error.main,
      showPasswords: false,
      required: true
    },
    password2: {
      value: '',
      error: false,
      message: '',
      required: true
    }
  };

  const [values, setValues] = useState(defaultValues);

  const handleClickShowPassword = () => {
    setValues({ ...values, password1: { ...values.password1, showPasswords: !values.password1.showPasswords } });
  };

  const onPasswordChange = value => {

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

    owasp.config({
      maxLength: 128,           // Protect against long password DDOS attack
      minLength: 8
    });

    const pwdStrengthMessage = (pwd) => {
      const testResults = owasp.test(pwd);
      let messageObject = { message: 'Weak password Strength', messageColor: theme.palette.error.main };
      if (pwd && testResults.requiredTestErrors.length === 0) {
        if (testResults.optionalTestsPassed >= 2) {
          messageObject = { message: 'Moderate password strength', messageColor: '#dd8f00' };
        }
        if (testResults.strong) {
          messageObject = { message: 'Strong password', messageColor: '#089c00' };
        }
      }
      return messageObject;
    };

    setValues({
      ...values,
      password1: {
        ...values.password1,
        value: value,
        error: value.length > 0,
        message: pwdStrengthMessage(value).message,
        messageColor: pwdStrengthMessage(value).messageColor
      }
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    let okayToSubmit = true;

    const checkField = async (field) => {
      // clone values object
      const newObject = JSON.parse(JSON.stringify({ ...values[field] }));

      const isRequired = (field) => {
        let error = false;
        if (values[field].required && !values[field].value) {
          // set new values
          newObject.error = true;
          newObject.message = 'This information is required to proceed';
          error = true;
          okayToSubmit = false;
        } else {
          newObject.error = false;
          newObject.message = defaultValues[field].message;
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
          newObject.message = defaultValues[field].message;
        }
        return error;
      };

      const isPasswordStrongEnough = async (field) => {
        let error = false;

        await checkPassword(values[field].value).then(response => {
          if (response.isTooWeak) {
            newObject.error = true;
            newObject.message = response.errorMessage;
            newObject.messageColor = theme.palette.error.main;
            error = true;
            okayToSubmit = false;
          } else {
            newObject.error = false;
            newObject.message = defaultValues[field].message;
            newObject.messageColor = theme.palette.error.main;
          }
        });

        return error;
      };

      const isEmailFormat = (field) => {
        let error = false;
        if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values.[field].value))) {
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

        await checkEmail(values[field].value).then(response => {
          if (response.result) {
            newObject.error = true;
            newObject.message = 'Email address is already taken';
            error = true;
            okayToSubmit = false;
          } else {
            newObject.error = false;
            newObject.message = defaultValues[field].message;
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
          newObject.message = defaultValues[field].message;
        }
        return error;
      };

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
          // if (matchesPassword1('password2')) break;
          if (await isPasswordStrongEnough(field)) break;
          break;

        case 'password2':
          if (isRequired(field)) break;
          if (matchesPassword1(field)) break;
          break;
      }

      return newObject;
    };

    // Need to perform a deep clone of the values object here so I start by
    // making an empty object and adding each child object with new parameters
    // one at a time.
    // Then I and add the whole new object to the state with setValues()
    const newValues = {};

    // Object.keys(values).forEach(async field => {
    //   console.log('loop Here: ', field);
    //   newValues[field] = await checkField(field);
    // });

    for (const field in values) {
      newValues[field] = await checkField(field);
    };

    setValues(newValues);
  };

  const preventDefaultEvent = (event) => {
    event.preventDefault();
  };

  return {
    classes,
    dispatch,
    setLoginOrRegister,
    values,
    setValues,
    handleClickShowPassword,
    onPasswordChange,
    handleSubmit,
    preventDefaultEvent
  };
};

export default RegisterLogic;
