const jwtConfig = {
  secretKey: 'Quixote',     // Key with which to generate the web token
  options: {
    expiresIn: '1m',        // See npm jasonwebtoken documentation
    algorithm: 'HS512'
  }
};

module.exports = jwtConfig;
