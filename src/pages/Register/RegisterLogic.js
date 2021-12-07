import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@material-ui/styles';
import { Slide } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import owasp from 'owasp-password-strength-test';

import { registerUser } from '../../server_requests/securityRequests.js';
import { setLoginOrRegister } from '../../App/AppSlice.js';
import { setLoginForm } from '../Login/loginSlice.js';
import { setRegisterForm } from './registerSlice.js';
import useStyles from './RegisterStyle.js';

const RegisterLogic = ({ ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const values = useSelector(state => state.register.registerForm);
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [showPasswords, setShowPasswords] = useState(false);

  const setValues = (newValues) => {
    dispatch(setRegisterForm(newValues));
  };

  const handleClickShowPassword = () => { setShowPasswords(!showPasswords); };

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
      if (response.err) {
        enqueueSnackbar(response.serverMessage, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          TransitionComponent: Slide
        });
        setValues(response.newUserDetails);
      } else {
        enqueueSnackbar(response.serverMessage, {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          TransitionComponent: Slide
        });
        setValues(response.newUserDetails);
        dispatch(setLoginForm({ emailAddress: response.newUserDetails.email.value, password: '' }));
        dispatch(setLoginOrRegister(true));
      }
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
    showPasswords,
    handleClickShowPassword,
    onPasswordChange,
    handleSubmit,
    preventDefaultEvent
  };
};

export default RegisterLogic;
