const { UnauthenticatedError } = require('../errors');

function isAuth(req, res, next) {
  if (req.user.id) next();
  else {
    throw new UnauthenticatedError('Not Authorized');
  }
}
module.exports = isAuth;
