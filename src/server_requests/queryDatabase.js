export const queryDatabase = (query, token, callback) => {
  console.log('token is: ', token);
  fetch('http://localhost:8080/api/query_DB/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',                             // Allow JSON responses
      'Content-Type': 'application/json',                       // Incoming data type to be JSON
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({ query: query })                      // Make sure the body params are a JSON object!
  })
    .then(response => response.json())
    .then(results => { callback(results); })
    .catch(response => { console.log('Fetch Error: ', response); });
};




export const checkEmail = email => {

  return fetch('http://localhost:8080/api/check_email/', {
    method: 'post',
    headers: {
      Accept: 'application/json',                               // Allow JSON responses
      'Content-Type': 'application/json'                        // Incoming data type to be JSON
    },
    body: JSON.stringify({ email: email })
  })
    .then(response => response.json());

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => resolve({ result: true }), 1000);
  // });


  // .then(async response => {
  //   console.log('Returning response: ', JSON.stringify(response.result));
  //   return response;
  //   // console.log('All Done!: ', JSON.stringify(response.result));
  // });
};
