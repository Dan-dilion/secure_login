import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Slide } from '@material-ui/core';

import { setLoginModalVisible } from '../../App/AppSlice.js';
import { setLoggedIn, setLoginForm } from './loginSlice.js';
import { requestLogin } from '../../server_requests/securityRequests.js';

import useStyles from './LoginStyle.js';

const LoginLogic = () => {
  const classes = useStyles();
  const { state } = useLocation();
  const navigate = useNavigate();
  const values = useSelector(state => state.login.loginForm);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  // const returnPath = useSelector(state => state.app.loginModal.returnPath)

  // const [values, setValues] = useState({
  //   emailAddress: '',
  //   password: '',
  //   showPassword: false
  // });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field) => (event) => {
    dispatch(setLoginForm({ ...values, [field]: event.target.value }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginAction = (results) => {
    if (results.verified) {
      dispatch(setLoggedIn(results));
      enqueueSnackbar('loginAction Success: ' + results.message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center'
        },
        TransitionComponent: Slide
      });
      dispatch(setLoginModalVisible(false));
      navigate(state.path || '/Body');
    } else {
      enqueueSnackbar(results.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center'
        },
        TransitionComponent: Slide
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    requestLogin(values.emailAddress, values.password, loginAction);
  };


  return {
    classes,
    values,
    showPassword,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleSubmit
  };

};


export default LoginLogic;
