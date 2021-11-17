const jwtConfig = {
  secretKey: 'Quixote',     // Key with which to generate the web token
  options: {
    expiresIn: '10m'         // See npm jasonwebtoken documentation
  }
};

module.exports = jwtConfig;
