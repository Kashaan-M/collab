const jwt = require('jsonwebtoken');
function createJWT(obj) {
  // tokenId corresponds to id field
  // tokenName corresponds to name filed
  return jwt.sign(obj, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
}

function decodeJWT(token) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}
module.exports = { createJWT, decodeJWT };
