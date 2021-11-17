// Request Log In
export const requestLogin = (userName, password, callBack) => {
  fetch('http://localhost:8080/api/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',                             // Allow JSON responses
      'Content-Type': 'application/json'                        // Incoming data type to be JSON
    },
    body: JSON.stringify({ userName: userName, password: password })  // Make sure the body params are a JSON object!
  })
    .then(response => response.json())
    .then(results => {
      // console.log("requestLogin - ", results.msg);
      localStorage.setItem('ACCESS_TOKEN', JSON.stringify(results));      // Store Token to keep login status
      callBack(results);
    })
    .catch(response => { console.log('Fetch Error: ', response); });
};



// Verify User
export const verifyUser = (token, callBack) => {
  console.log('SecurityRequests.js - verifying User...');

  if (token) {
    fetch('http://localhost:8080/api/verify_user', {
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
