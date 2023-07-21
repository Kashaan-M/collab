const { BadRequestError } = require('../errors');

function checkAll(obj, keyObj) {
  // this function takes either req.body or req.param as 1st parameter
  // this function takes either Object.keys[req.body] or Object.keys[req.params] as 2nd param
  // and returns true if all entries are defined
  // note '0' will also return true BUT 0 will return false(This is not really relevant)
  if (keyObj.length !== 0) {
    return keyObj
      .map((key) => {
        return obj[key] ? true : false;
      })
      .every((item) => item === true);
  }
  return false;
}
/** 
 *@params schema the joi schema for validating req.body

  This is a middleware function which validates if all entries in req.body are not undefined.
  Also, if query parameters are passed then all entries in req.params are not undefined
 */

module.exports = (schema) => {
  return (req, res, next) => {
    let body = req.body;
    let params = req.params;
    let bkeys = Object.keys(body);
    let pkeys = Object.keys(params);

    const allBodyItemsDefined = checkAll(body, bkeys);
    const allParamItemsDefined = checkAll(params, pkeys);

    if (!allBodyItemsDefined) {
      throw BadRequestError('Information Not Provided');
    }
    if (pkeys.length != 0) {
      if (!allParamItemsDefined) {
        throw BadRequestError('Information Not Provided');
      }
    }
    const { error, value } = schema.validate(body);
    // if joi throws up validation error
    if (error) {
      const message = error.details[0].message;
      throw new BadRequestError(message);
    }

    next();
  };
};
