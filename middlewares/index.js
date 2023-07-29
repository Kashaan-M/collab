const notFoundMiddleware = require('./not-found');
const errorHandlerMiddleware = require('./error-handler');
const isAuth = require('./isAuth');
const basicRateLimiter = require('./basicRateLimiter');

module.exports = {
  notFoundMiddleware,
  errorHandlerMiddleware,
  isAuth,
  basicRateLimiter,
};
