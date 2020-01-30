var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
const redis = require('redis');
const history = require('connect-history-api-fallback')

const cors = require("cors")
// const redisStore = require('connect-redis')(session);
// const client  = redis.createClient();

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const vuepublic = express.static(path.join(__dirname, 'dist'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(vuepublic)
app.use(history())
app.use(vuepublic);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'tajna',


//    store: new redisStore({ host: 'localhost', port: 6379, client: client}),
    saveUninitialized: false,
    cookie: {maxAge: 60000},
    resave: false
}));


app.use(
    cors({
        credentials: true,
        origin: "http://localhost:8080"
    }),
);

app.use(function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "true");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
    res.header("Access-Control-Request-Methods", "POST");
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use('/', indexRouter);

const korisniciRouter = require('./routes/korisnici');
app.use('/korisnici',korisniciRouter);

const licitacijeRouter = require('./routes/licitacije');
app.use('/licitacije',licitacijeRouter);

const oglasiRouter = require('./routes/oglasi');
app.use('/oglasi', oglasiRouter);


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
