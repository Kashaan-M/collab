const path = require('path');
require('dotenv').config();
require('express-async-errors');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const xssClean = require('xss-clean');

// initalize sequelize with session store
let SequelizeStore = require('connect-session-sequelize')(session.Store);

const {
  signUpRouter,
  authRouter,
  projectsRouter,
  commentRouter,
} = require('./routes');

// db
const { sequelize } = require('./sequelize');
// error handlers
const {
  errorHandlerMiddleware,
  notFoundMiddleware,
  isAuth,
} = require('./middlewares');

const app = express();

app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(helmet());
app.use(
  cors({
    origin: ['http://localhost:5173'], // front-end url
    methods: ['GET', 'POST', 'OPTION'],
    credentials: true,
  }),
);
app.use(morgan('dev'));
app.use(xssClean());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
      checkExpirationInterval: 15 * 60 * 1000, // creates a DELETE query in "Sessions" after every 15 min(for expired sessions)
      expiration: 15 * 60 * 1000, // maximum age of a valid session (same as cookie)
    }),
  }),
);
app.use(passport.authenticate('session'));

const port = process.env.PORT || 8000;

// routes
app.use('/api/login', authRouter);
app.post('/api/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) next(err);
    return res.status(200).json({ msg: 'success' });
  });
});
app.use('/api/signup', signUpRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/comment', commentRouter);
// error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('connection has been established successfully');

    await sequelize.sync();

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (er) {
    console.log('Unable to connect', er);
  }
};

start();
