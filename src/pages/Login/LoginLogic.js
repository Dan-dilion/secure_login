import { useState } from 'react';
import bcrypt from 'bcryptjs';

import { requestLogin } from '../../server_requests/securityRequests.js';

const LoginLogic = (props) => {

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
      // props.storeToken({
      props.storeToken({
        verified: results.loginSuccess,
        jwt: results.token,
        user: results.user
      });
      console.log('loginAction Success: ', results.msg);
      console.log('\nNew token: ', results.token);
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
