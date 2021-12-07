import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Slide } from '@material-ui/core';

import { setLoginModalVisible, setLoginOrRegister } from '../../App/AppSlice.js';
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
      enqueueSnackbar('loginAction Success: ' + results.msg, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        TransitionComponent: Slide
      });
      dispatch(setLoginModalVisible({ visible: false, returnPath: state.path }));
      navigate(state.path || '/Body');
    } else {
      enqueueSnackbar(results.msg, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        TransitionComponent: Slide
      });
    }
  };

  const handleSubmit = (event) => {
    requestLogin(values.emailAddress, values.password, loginAction);
    event.preventDefault();
  };


  return {
    classes,
    setLoginOrRegister,
    dispatch,
    values,
    showPassword,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleSubmit
  };

};


export default LoginLogic;
