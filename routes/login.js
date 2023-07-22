const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const {
  sequelize: { models },
} = require('../sequelize');
const router = require('express').Router();
const Joi = require('joi');
const firstValidate = require('../middlewares/firstValidate');

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async function (username, password, done) {
      try {
        // check if user exists
        const userRecord = await models.user.findOne({
          where: { email: username },
        });

        // if user exists
        if (userRecord == null) {
          return done(null, false, { message: 'Bad Request' });
        }

        const { id: userId, password: hashedPass } = userRecord.dataValues;

        // compare the userPass with hashedPass
        const isMatch = await bcrypt.compare(password, hashedPass);

        // if passwords don't match
        if (!isMatch) {
          return done(null, false, { message: 'Wrong Credentials' });
        }

        const user = userRecord.toJSON();

        return done(null, user);
      } catch (er) {
        return done(er);
      }
    },
  ),
);

//A login session is established upon a user successfully authenticating using a credential.
//The following route will authenticate a user using a username and password.
//If successfully verified, Passport will call the serializeUser function,
//which in this case is storing the user's ID
//
passport.serializeUser(function (user, done) {
  done(null, {
    id: user.id,
    displayName: user.displayName,
    email: user.email,
  });
});

//  When the session is authenticated, Passport will call the deserializeUser function,
//  which in the above example is yielding the previously stored user ID.
//  The req.user property is then set to the yielded information.

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const loginSchema = Joi.object({
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

router.post(
  '/',
  firstValidate(loginSchema),
  passport.authenticate('local', {
    successMessage: 'success',
    failureMessage: true,
  }),
  (req, res) => {
    if (req.user) {
      res.status(200).json({ msg: 'success' });
    }
  },
);

module.exports = router;
