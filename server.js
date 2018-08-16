const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const assert = require('assert');
require('./db/db');


// +++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++
// BACKED SESSION STORAGE (CONNECT+EXPRESS:
// +++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/project_2_session_test',
  collection: 'mySessions'
});

store.on('connected', function () {
  store.client;
});

store.on('error', function (error) {
  assert.ifError(error);
  assert.ok(false);
});

app.use(session({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  },
  store: new MongoDBStore({
    url: process.env.MONGOLAB_URI //new code
  }),
  resave: true,
  saveUninitialized: true
}));


app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


app.use((req, res, next) => {
  next()
});

const authController = require('./controllers/authController');
const exerciseController = require('./controllers/exerciseController');
const usersController = require('./controllers/usersController');
const workoutController = require('./controllers/workoutController');

app.use('/auth', authController);
app.use('/exercise', exerciseController);
app.use('/user', usersController);
app.use('/workout', workoutController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.listen(port, () => {
  console.log('App is listening');
});
