const router = require('express').Router();
const { signup } = require('../controllers/signup');
const Joi = require('joi');
const firstValidate = require('../middlewares/firstValidate');

const signUpSchema = Joi.object({
  displayName: Joi.string()
    .pattern(new RegExp('^[a-zA-Z]+\\w{2,20}$'))
    .message(
      'displayName should contain(atleast 3) alphanumeric characters.First character must be alphabet.',
    )
    .max(20)
    .message(
      'displayName should contain(maximum 20) alphanumeric characters.First character must be alphabet',
    )
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'io'] } })
    .label('email')
    .messages({ 'string.email': 'invalid email' })
    .max(30)
    .message('email cannot be longer than 30 characters')
    .required(),
  password: Joi.string()
    .min(7)
    .message('password must be atleast 7 characters long')
    .max(20)
    .message("password can't be longer than 20 characters")
    .required(),
});

router.post('/', firstValidate(signUpSchema), signup);

module.exports = router;
