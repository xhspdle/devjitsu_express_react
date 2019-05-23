const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');
// const session = require('express-session');

const indexRouter = require('./routes/index');
const contactRouter = require('./routes/contact');
//const usersRouter = require('./routes/users');

const app = express();
// var sess = {
//     store: new RedisStore(), //세션을 redis에 담아야 메모리 누수가 안생김
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {}
// }

app.use(helmet());

// view engine setpup(for error page)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/', indexRouter);
app.use('/contact', contactRouter);
//app.use('/users', usersRouter);

console.log('[[ process.env.NODE_ENV ]] : ' + process.env.NODE_ENV);
/*
    NODE_ENV 셋팅 방법
    - powershell : $env:NODE_ENV="production"
    - linux : export NODE_ENV=production
*/
if(process.env.NODE_ENV === 'production'){
    // app.set('trust proxy', 1);
    // sess.cookie.secure = true;

    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

// app.use(session(sess));

// catch 404 and forward to error handler
app.use(function(req, res, next){
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next){
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;