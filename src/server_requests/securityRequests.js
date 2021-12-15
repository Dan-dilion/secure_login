import { setLogout } from '../pages/Login/loginSlice.js';
import store from '../reducers/';

const port = 8986;
const apiUrl = `${window.location.protocol}//${window.location.hostname}:${port}`;

console.log('apiURL: ', apiUrl);

// Request Log In
export const requestLogin = (emailAddress, password, callBack) => {
  fetch(apiUrl + '/api/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',                                               // Allow JSON responses
      'Content-Type': 'application/json',                                       // Incoming data type to be JSON
      Authorization: `Basic ${btoa(`${emailAddress}:${password}`)}`
    }
  })
    .then(response => response.json())
    .then(results => {
      // console.log("requestLogin - ", results.message);
      if (results.verified) localStorage.setItem('ACCESS_TOKEN', JSON.stringify(results));      // Store Token to keep login status
      callBack(results);
    })
    // .catch(response => { console.log('Fetch Error: ', response); });
    .catch(response => callBack(response));
};


// Sign User Out
export const signOut = () => {
  localStorage.removeItem('ACCESS_TOKEN');
  store.dispatch(setLogout());
};


// Delete User From Database
export const deleteUser = (token, userId) => {
  const response = fetch(apiUrl + '/api/delete_user/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',                             // Allow JSON responses
      'Content-Type': 'application/json',                     // Incoming data type to be JSON
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({ userId: userId })
  })
    .then(response => response.json())
    .catch(response => { console.log('Delete User Fetch Error: ', response); });

  signOut();
  return response;
};


// Verify User
export const verifyUser = (token, callBack) => {
  console.log('SecurityRequests.js - verifying User...');

  if (token) {
    fetch(apiUrl + '/api/verify_user', {
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
  return fetch(apiUrl + '/api/register_new_user/', {
    method: 'post',
    headers: {
      Accept: 'application/json',                               // Allow JSON responses
      'Content-Type': 'application/json'                        // Incoming data type to be JSON
    },
    body: JSON.stringify({ userDetails: userDetails })
  })
    .then(response => response.json());
};
