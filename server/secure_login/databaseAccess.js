const connectionPool = require('./config/dbConfig.js');
const serverUtils = require('./serverUtils.js');

const prefix = connectionPool.customOptions.prefix;
const database = connectionPool.config.connectionConfig.database;


/******************************************************************************/
/**
 * Check Login Details
 */

const checkLoginDetails = async (emailAddress, password) => {
  console.log(`Attempting login with email: ${emailAddress} and password: ${password}`);
  const statement = `SELECT * FROM ${database}.${prefix}users WHERE email = ?;`;

  const queryDatabase = query => new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        console.log('DB connection failed: ', err);
        reject(new Error('DB connection failed: ' + err));
      }

      connection.query(query, [emailAddress], (err, result, fields) => {
        if (err) {
          console.log('DB query failed: ', err);
          reject(new Error('DB query failed: ' + err.code + ': ' + err.sqlMessage));
        } else resolve(result);
      });

      connection.release();
      if (err) {
        console.log('DB connection release error: ', err);
        reject(new Error('DB connection release error: ' + err));
      }
    });
  });

  return await queryDatabase(statement)
    .then(async result => {
      if (result.length > 0) {
        const verifyPasswordHashResults = await serverUtils.comparePasswordHash(password, result[0].password);
        return { ...verifyPasswordHashResults, result: result };
      } else return { success: false, message: 'Email or Password Incorrect!', result: [] };
    })
    .catch(error => ({ success: false, message: error.toString() }));
};


/******************************************************************************/

/**
 * Set Last Logged In Time & Date
 */

const setLastLoggedInTime = id => {
  try {
    connectionPool.getConnection((err, connection) => {
      if (err) throw new Error('DB connection failed: ' + err);

      connection.query(`UPDATE ${database}.${prefix}users SET datelastlogin = now() WHERE id = '${id}'`, (err, result, fields) => {
        if (err) throw new Error('DB query error - failed to set datelastlogin: ' + err.code + ': ' + err.sqlMessage);
      });

      connection.release();
      if (err) throw new Error('DB connection release error: ' + err);
    });
  } catch (err) {
    console.log('An error occurred while attempting to update datelastlogin: ', err);
  }
};


/******************************************************************************/

/**
 * Check database for email address
 */

const checkEmailExists = email => {
  const checkEmailQuery = `SELECT * FROM ${database}.${prefix}users WHERE email = ?`;

  const queryDatabase = query => new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        console.log('DB connection failed: ', err);
        reject(new Error('DB connection failed: ' + err));
      }

      connection.query(query, [email], (err, result, fields) => {
        if (err) {
          console.log('DB query failed: ', err);
          reject(new Error('DB query failed: ' + err.code + ': ' + err.sqlMessage));
        } else resolve(result);
      });

      connection.release();
      if (err) {
        console.log('DB connection release error: ', err);
        reject(new Error('DB connection release error: ' + err));
      }
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
 * Delete User From Database
 */

const deleteUser = (userId) => {
  const statement = `DELETE FROM ${database}.${prefix}users WHERE id = ?;`;

  const queryDatabase = query => new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        console.log('DB connection failed: ', err);
        reject(new Error('DB connection failed: ' + err));
      }

      connection.query(query, [userId], (err, result, fields) => {
        if (err) {
          console.log(`Attempting to delete user ${userId} - DB query failed: `, err);
          reject(new Error(`DB query failed - ${err.code}: ${err.sqlMessage}`));
        } else if (result.affectedRows < 1) {
          console.log(`Attempting to delete user ${userId} - DB Error - No affected rows!`);
          reject(new Error('DB Error - No affected rows!'));
        } else resolve(result);
      });

      connection.release();
      if (err) {
        console.log('DB connection release error: ', err);
        reject(new Error('DB connection release error: ' + err));
      }
    });

  });

  return queryDatabase(statement)
    .then(result => ({ verified: true, error: false, message: `${result.affectedRows} users deleted from database`, results: result }))
    .catch(error => ({ verified: true, error: true, message: error.toString() }));
};


/******************************************************************************/

/**
 * Get User Details
 */

const getUserDetails = () => {
  const statement = `SELECT id, username, email, password, phone, address, dob, gender, datecreated, datelastlogin FROM ${database}.${prefix}users`;

  const queryDatabase = query => new Promise((resolve, reject) => {

    connectionPool.getConnection((err, connection) => {
      if (err) {
        console.log('DB connection failed: ', err);
        reject(new Error('DB connection failed: ' + err));
      }

      connection.query(query, (err, result, fields) => {
        if (err) {
          console.log('DB query failed - ', err);
          reject(new Error('DB query failed - ' + err.code + ': ' + err.sqlMessage));
        } else resolve(result);
      });

      connection.release();
      if (err) {
        console.log('DB connection release error: ', err);
        reject(new Error('DB connection release error: ' + err));
      }
    });

  });

  return queryDatabase(statement)
    .then(result => ({ verified: true, error: false, results: result }))
    .catch(error => ({ verified: true, error: true, message: error.toString() }));
};


/******************************************************************************/
/**
 * Add New User Details
 */

const addNewUser = (details) => {
  const statement = `INSERT INTO ${database}.${prefix}users(username, email, password, phone, address, dob, gender) VALUES (?, ?, ?, ?, ?, ?, ?);`;

  const queryDatabase = query => new Promise((resolve, reject) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        console.log('DB connection failed: ', err);
        reject(new Error('DB connection failed: ' + err));
      }

      connection.query(query, [
        details.username.value,
        details.email.value,
        details.password1.hash,
        details.phone.value ? details.phone.value : null,
        details.address.value ? details.address.value : null,
        details.dob.value ? details.dob.value : null,
        details.gender.value ? details.gender.value : null
      ], (err, result, fields) => {
        if (err) {
          console.log('DB query error!: ', err);
          reject(new Error(`DB query error!: ${err.code}: ${err.sqlMessage}`));
        } else resolve(result);
      });

      connection.release();
      if (err) {
        console.log('DB connection release error: ', err);
        reject(new Error('DB connection release error: ' + err));
      }
    });

  });

  return queryDatabase(statement)
    .then(response => ({ err: false, message: 'User registration complete' }))
    .catch(error => ({ err: true, message: `An error occurred while adding users to the database: ${error}` }));
};


module.exports = {
  checkLoginDetails,
  setLastLoggedInTime,
  checkEmailExists,
  deleteUser,
  getUserDetails,
  addNewUser
};
