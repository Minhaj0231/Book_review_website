const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const {check} = require('express-validator');
const csrf = require('csurf');
const mongoose = require('mongoose');
const flash = require('connect-flash');

const config = require('./config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const bookRouter = require('./routes/book');


const csrfProtection = csrf({cookie: true} );



mongoose.connect(`${config.mongodbUrl}/book_review`, {useNewUrlParser: true}).then(
  msg => {console.log("MongoDB connected:    " + msg);}
  
);

const store = new MongoDBStore({
  uri:`${config.mongodbUrl}/book_review`,
  collection: 'sessions'
});




const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));


app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(csrfProtection)


app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// app.use((req, res, next) => {
//   // throw new Error('Sync Dummy');
//   if (!req.session.user) {
//     return next();
//   }
//   User.findById(req.session.user._id)
//     .then(user => {
//       if (!user) {
//         return next();
//       }
//       req.user = user;
//       next();
//     })
//     .catch(err => { 
//       next(new Error(err));
//     });
// });

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter); 
app.use('/book', bookRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
