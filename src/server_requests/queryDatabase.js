export const queryDatabase = (sql, token, callback) => {
  console.log('token is: ', token);
  fetch('http://localhost:8080/api/query_db/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',                             // Allow JSON responses
      'Content-Type': 'application/json',                       // Incoming data type to be JSON
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({ query: sql })                      // Make sure the body params are a JSON object!
  })
    .then(response => response.json())
    .then(results => { callback(results); })
    .catch(response => { console.log('Fetch Error: ', response); });
};
