const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { registerJoiValidator, loginJoiValidator } = require('./middlewares/joiValidator');
const auth = require('./middlewares/auth');
const notFound = require('./middlewares/notFound');
const { createUser, login } = require('./controllers/users');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', loginJoiValidator, login);

app.post('/signup', registerJoiValidator, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(notFound);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен...');
});
