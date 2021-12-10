import { setLogout } from '../pages/Login/loginSlice.js';
import store from '../reducers/';

// Request Log In
export const requestLogin = (emailAddress, password, callBack) => {
  fetch('http://localhost:8987/secure_login/api/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',                             // Allow JSON responses
      'Content-Type': 'application/json'                        // Incoming data type to be JSON
    },
    body: JSON.stringify({ emailAddress: emailAddress, password: password })  // Make sure the body params are a JSON object!
  })
    .then(response => response.json())
    .then(results => {
      // console.log("requestLogin - ", results.message);
      localStorage.setItem('ACCESS_TOKEN', JSON.stringify(results));      // Store Token to keep login status
      callBack(results);
    })
    .catch(response => { console.log('Fetch Error: ', response); });
};


// Sign User Out
export const signOut = () => {
  localStorage.removeItem('ACCESS_TOKEN');
  store.dispatch(setLogout());
};


// Delete User From Database
export const deleteUser = (token, userId) => {
  const response = fetch('http://localhost:8987/secure_login/api/delete_user/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',                             // Allow JSON responses
      'Content-Type': 'application/json',                     // Incoming data type to be JSON
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({ userId: userId })
  })
    .then(response => response.json())
    .catch(response => { console.log('Fetch Error: ', response); });

  signOut();
  return response;
};


// Verify User
export const verifyUser = (token, callBack) => {
  console.log('SecurityRequests.js - verifying User...');

  if (token) {
    fetch('http://localhost:8987/secure_login/api/verify_user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',                             // Allow JSON responses
        'Content-Type': 'application/json',                     // Incoming data type to be JSON
        Authorization: 'Bearer ' + token                        // Attach JWT
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log('Response here: ', response);
        if (!response.verified) localStorage.removeItem('ACCESS_TOKEN');         // Remove stored token
        return callBack(response.verified);
      })
      .catch(response => { console.log('fetch verify_user error: ', response); });
  } else {
    console.log('SecurityRequests - verifyUser - No token!', token);
    callBack(false);
  }
};


// Register New User
export const registerUser = userDetails => {
  return fetch('http://localhost:8987/secure_login/api/register_new_user/', {
    method: 'post',
    headers: {
      Accept: 'application/json',                               // Allow JSON responses
      'Content-Type': 'application/json'                        // Incoming data type to be JSON
    },
    body: JSON.stringify({ userDetails: userDetails })
  })
    .then(response => response.json());
};
