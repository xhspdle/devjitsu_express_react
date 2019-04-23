const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setpup(for error page)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        /*
        빌드되는거 보고 아래 두개중에 하나 선택해서 써야댐
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
        res.sendFile(path.resolve(__dirname, 'build', 'public', 'index.html'));
        */
    });
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/', indexRouter);
//app.use('/users', usersRouter);

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