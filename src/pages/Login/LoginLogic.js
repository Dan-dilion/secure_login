import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import bcrypt from 'bcryptjs';

import { setLoginModalVisible } from '../../App/AppSlice.js';
import { setLoggedIn } from './loginSlice.js';
import { requestLogin } from '../../server_requests/securityRequests.js';

import useStyles from './LoginStyle.js';

const LoginLogic = () => {
  const classes = useStyles();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const returnPath = useSelector(state => state.app.loginModal.returnPath)
  const [hash, setHash] = useState('');

  const [values, setValues] = useState({
    userName: '',
    password: '',
    showPassword: false
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    if (prop === 'password') hashPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const hashPassword = (password) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (!err) {
        bcrypt.hash(password, salt, (err, hash) => {
          if (!err) setHash(hash);
        });
      }
    });
  };

  const loginAction = (results) => {
    if (results.verified) {
      dispatch(setLoggedIn(results));
      console.log('loginAction Success: ', results.msg);
      dispatch(setLoginModalVisible({ visible: false, returnPath: state.path }));
      navigate(state.path || '/Body');
    } else {
      console.log('loginAction Fail: ', results.msg);
    }
  };

  const handleSubmit = (event) => {
    requestLogin(values.userName, values.password, loginAction);
    event.preventDefault();
  };


  return {
    classes,
    values,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    hash,
    handleSubmit
  };

};


export default LoginLogic;
