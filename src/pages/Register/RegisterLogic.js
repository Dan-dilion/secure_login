import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setLoginOrRegister } from '../../App/AppSlice.js';
import useStyles from './RegisterStyle.js';

const RegisterLogic = ({ ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    username: '',
    email: '',
    emailError: false,
    emailMessage: '',
    phone: '',
    dob: null,
    isDobFocused: false,
    address: '',
    gender: '',
    password1: '',
    showPassword1: false,
    password2: '',
    showPassword2: false
  });

  const validateEmailInput = (value) => {
    console.log('RegisterLogic - validate email value: ', value);
    if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) && value.length > 3) {
      console.log('RegisterLogic - validate email: fail');
      setValues(values.emailError = true);
      setValues(values.emailMessage = 'You must enter a valid email address!');
    } else {
      console.log('RegisterLogic - validate email: pass');
      setValues(values.emailError = false);
      setValues(values.emailMessage = '');
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
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
    validateEmailInput,
    handleClickShowPassword,
    preventDefaultEvent
  };
};

export default RegisterLogic;
