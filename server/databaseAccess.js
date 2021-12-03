const db = require('./db.js');

const serverUtils = require('./serverUtils.js');

/**
 * Check Login Details
 */

const checkLoginDetails = async (userName, password) => {
  const statement = 'SELECT * FROM node_login.users WHERE username = ?;';

  const queryDatabase = query => new Promise((resolve, reject) => {
    db.query(query, [userName], (err, result, fields) => {
      if (err) reject(new Error('DB query failed: ' + err.code + ': ' + err.sqlMessage));
      else resolve(result);
    });
  });

  return await queryDatabase(statement)
    .then(async result => {
      if (result.length > 0) {
        const verifyPasswordHashResults = await serverUtils.comparePasswordHash(password, result[0].password);
        return { ...verifyPasswordHashResults, result: result };
      } else return { success: false, message: 'Username or Password Incorrect!', result: [] };
    });
};

/******************************************************************************/

/**
 * Set Last Logged In Time & Date
 */

const setLastLoggedInTime = id => {
  db.query(`UPDATE users SET datelastlogin = now() WHERE id = '${id}'`);
};


/******************************************************************************/

/**
 * Check database for email address
 */

const checkEmailExists = email => {
  const checkEmailQuery = 'SELECT * FROM node_login.users WHERE email = ?';

  const queryDatabase = query => new Promise((resolve, reject) => {
    db.query(query, [email], (err, result, fields) => {
      if (err) reject(new Error('DB query failed: ' + err.code + ': ' + err.sqlMessage));
      else resolve(result);
    });
  });

  return queryDatabase(checkEmailQuery)
    .then(result => result.length > 0
      ? ({ result: true, err: false })
      : ({ result: false, err: false })
    )
    .catch(error => ({ err: true, errMessage: error.toString() }));
};

/******************************************************************************/

/**
 * Get User Details
 */

const getUserDetails = () => {
  const statement = 'SELECT id, username, password, email FROM node_login.users';

  const queryDatabase = query => new Promise((resolve, reject) => {
    db.query(query, (err, result, fields) => {
      err
        ? reject(new Error('DB query failed: ' + err.code + ': ' + err.sqlMessage))
        : resolve(result);
    });
  });

  return queryDatabase(statement)
    .then(result => ({ verified: true, error: false, results: result }))
    .catch(error => ({ verified: true, error: true, message: error.toString() }));
};


module.exports = { checkLoginDetails, setLastLoggedInTime, checkEmailExists, getUserDetails };
