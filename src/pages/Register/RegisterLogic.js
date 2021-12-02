import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@material-ui/styles';
import owasp from 'owasp-password-strength-test';

import { checkEmail } from '../../server_requests/queryDatabase.js';
import { checkPassword, registerUser } from '../../server_requests/securityRequests.js';
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
      messageColor: 'red',
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
      let messageObject = { message: 'Weak password Strength', messageColor: 'red' };
      if (pwd && testResults.requiredTestErrors.length === 0) {
        if (testResults.optionalTestsPassed >= 3) {
          messageObject = { message: 'Moderate password strength', messageColor: 'yellow' };
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

    // const handleRegistrationErrors = errors => {
    //   console.log('registerLogic - handleRegistrationErrors - errors: ', errors);
    // };

    event.preventDefault();
    await registerUser({
      username: values.username,
      email: values.email,
      phone: values.phone,
      dob: values.dob,
      address: values.address,
      gender: values.gender,
      password1: values.password1,
      password2: values.password2
    }).then(response => {
      console.log('NewValues here: ', response);
      setValues(response.newUserDetails);
    });
  };

  const preventDefaultEvent = (event) => {
    event.preventDefault();
  };

  return {
    classes,
    theme,
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
