import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import bcrypt from 'bcryptjs';

import { setLoginModalVisible } from '../../App/AppSlice.js';
import { setLoggedIn } from './loginSlice.js';
import { requestLogin } from '../../server_requests/securityRequests.js';

const LoginLogic = () => {

  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const returnPath = useSelector(state => state.app.loginModal.returnPath)
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [hash, setHash] = useState('');

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
    if (results.loginSuccess) {
      dispatch(setLoggedIn({
        verified: results.loginSuccess,
        jwt: results.token,
        user: results.user
      }));
      console.log('loginAction Success: ', results.msg);
      console.log('\nNew token: ', results.token);
      console.log('Location State: ', state);
      dispatch(setLoginModalVisible({ visible: false, returnPath: state.path }));
      navigate(state.path || '/Body');
    } else {
      console.log('loginAction Fail: ', results.msg);
    }
  };

  const onChangeUsername = e => setUserName(e.target.value);
  const onChangePassword = e => {
    setPassword(e.target.value);
    hashPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    requestLogin(userName, password, loginAction);

    console.log('User name: ' + userName + ' - Password: ' + password);
    event.preventDefault();
  };


  return {
    userName,
    password,
    hash,
    handleSubmit,
    onChangeUsername,
    onChangePassword
  };

};


export default LoginLogic;
