import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';

import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import boads from './routes/boads.js';
import checkBoads from './routes/checkers/boads';
import todolists from './routes/todolists';
import tasks from './routes/tasks';
import comments from './routes/comments';
import labels from './routes/labels';
import lists from './routes/lists';
import cards from './routes/cards';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'react/public')));

app.use('/boads', checkBoads);
app.use('/boads', boads);
app.use('/lists', lists);
app.use('/cards', cards);
app.use('/todolists', todolists);
app.use('/tasks', tasks);
app.use('/comments', comments);
app.use('/labels', labels);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
