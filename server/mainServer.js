const cors = require('cors');
const router = require('./secure_login/router.js');
const express = require('express');
const app = express();

const config = require('./server_config.json');

// express.json() is middleware to allow json payloads see https://flaviocopes.com/express-post-query-variables/
// The cors middleware package takes care of headers now
// app.use(express.json(), (request, response, next) => {
//   response.header("Access-Control-Allow-Origin", "*");        // Allow incoming cross origin requests
//   response.header("Access-Control-Allow-Headers", "*");       // Allow incoming JSON Payloads
//   next();
// });

app.use(express.json());
app.use(cors());
app.use('/api', router);
app.listen(config.port);

console.log(`Node server listening on port ${config.port}`);
