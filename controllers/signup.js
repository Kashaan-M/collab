const bcrypt = require('bcryptjs');
const {
  sequelize: { models },
} = require('../sequelize');
const { BadRequestError } = require('../errors');

async function signup(req, res) {
  let { displayName, email, password } = req.body;
  // check if user exists
  const isExist = await models.user.findOne({
    where: { displayName, email },
  });
  // if user exists
  if (isExist) {
    throw new BadRequestError('User already exists.');
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  // add user
  const addUser = await models.user.create({
    displayName,
    email,
    password,
  });

  res.status(200).json({ msg: 'success' });
}

module.exports = { signup };
