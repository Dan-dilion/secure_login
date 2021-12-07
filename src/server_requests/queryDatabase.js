export const getUserDetails = (token) => {
  return fetch('http://localhost:8987/secure_login/api/get_user_details/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',                             // Allow JSON responses
      'Content-Type': 'application/json',                     // Incoming data type to be JSON
      Authorization: 'Bearer ' + token
    }
  })
    .then(response => response.json())
    .catch(response => { console.log('Fetch Error: ', response); });
};




export const checkEmail = email => {
  return fetch('http://localhost:8987/secure_login/api/check_email/', {
    method: 'post',
    headers: {
      Accept: 'application/json',                               // Allow JSON responses
      'Content-Type': 'application/json'                        // Incoming data type to be JSON
    },
    body: JSON.stringify({ email: email })
  })
    .then(response => response.json());
};
