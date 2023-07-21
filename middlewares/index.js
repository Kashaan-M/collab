const notFoundMiddleware = require('./not-found');
const errorHandlerMiddleware = require('./error-handler');
const isAuth = require('./isAuth');

module.exports = {
  notFoundMiddleware,
  errorHandlerMiddleware,
  isAuth,
};
