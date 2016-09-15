/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//#!/usr/bin/env node

	/**
	 * Module dependencies.
	 */

	var app = __webpack_require__(1);
	var debug = __webpack_require__(22)('app:server');
	var http = __webpack_require__(23);

	/**
	 * Get port from environment and store in Express.
	 */

	var port = normalizePort(process.env.PORT || '3000');
	app.set('port', port);

	/**
	 * Create HTTP server.
	 */

	var server = http.createServer(app);

	/**
	 * Listen on provided port, on all network interfaces.
	 */

	server.listen(port);
	server.on('error', onError);
	server.on('listening', onListening);

	/**
	 * Normalize a port into a number, string, or false.
	 */

	function normalizePort(val) {
	  var port = parseInt(val, 10);

	  if (isNaN(port)) {
	    // named pipe
	    return val;
	  }

	  if (port >= 0) {
	    // port number
	    return port;
	  }

	  return false;
	}

	/**
	 * Event listener for HTTP server "error" event.
	 */

	function onError(error) {
	  if (error.syscall !== 'listen') {
	    throw error;
	  }

	  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	  // handle specific listen errors with friendly messages
	  switch (error.code) {
	    case 'EACCES':
	      console.error(bind + ' requires elevated privileges');
	      process.exit(1);
	      break;
	    case 'EADDRINUSE':
	      console.error(bind + ' is already in use');
	      process.exit(1);
	      break;
	    default:
	      throw error;
	  }
	}

	/**
	 * Event listener for HTTP server "listening" event.
	 */

	function onListening() {
	  var addr = server.address();
	  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	  debug('Listening on ' + bind);
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _path = __webpack_require__(3);

	var _path2 = _interopRequireDefault(_path);

	var _serveFavicon = __webpack_require__(4);

	var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

	var _morgan = __webpack_require__(5);

	var _morgan2 = _interopRequireDefault(_morgan);

	var _cookieParser = __webpack_require__(6);

	var _cookieParser2 = _interopRequireDefault(_cookieParser);

	var _bodyParser = __webpack_require__(7);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _boads = __webpack_require__(8);

	var _boads2 = _interopRequireDefault(_boads);

	var _boads3 = __webpack_require__(14);

	var _boads4 = _interopRequireDefault(_boads3);

	var _todolists = __webpack_require__(15);

	var _todolists2 = _interopRequireDefault(_todolists);

	var _tasks = __webpack_require__(16);

	var _tasks2 = _interopRequireDefault(_tasks);

	var _comments = __webpack_require__(17);

	var _comments2 = _interopRequireDefault(_comments);

	var _labels = __webpack_require__(18);

	var _labels2 = _interopRequireDefault(_labels);

	var _lists = __webpack_require__(19);

	var _lists2 = _interopRequireDefault(_lists);

	var _cards = __webpack_require__(21);

	var _cards2 = _interopRequireDefault(_cards);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)();

	// view engine setup
	app.set('views', _path2.default.join(__dirname, 'views'));
	app.set('view engine', 'ejs');

	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use((0, _morgan2.default)('dev'));
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({ extended: false }));
	app.use((0, _cookieParser2.default)());
	//app.use(express.static(path.join(__dirname, 'public')));
	app.use(_express2.default.static(_path2.default.join(__dirname, 'react/public')));

	app.use('/boads', _boads4.default);
	app.use('/boads', _boads2.default);
	app.use('/lists', _lists2.default);
	app.use('/cards', _cards2.default);
	app.use('/todolists', _todolists2.default);
	app.use('/tasks', _tasks2.default);
	app.use('/comments', _comments2.default);
	app.use('/labels', _labels2.default);

	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	// error handlers
	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
	  app.use(function (err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('error', {
	      message: err.message,
	      error: err
	    });
	  });
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function (err, req, res, next) {
	  res.status(err.status || 500);
	  res.render('error', {
	    message: err.message,
	    error: {}
	  });
	});

	module.exports = app;
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _models = __webpack_require__(9);

	var _DefaultResponse = __webpack_require__(11);

	var _DefaultResponse2 = _interopRequireDefault(_DefaultResponse);

	var _RemoveModel = __webpack_require__(12);

	var _RemoveModel2 = _interopRequireDefault(_RemoveModel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	router.get('/', function (req, res, next) {
	  _models.Boad.find({}).sort({ date_create: -1 }).lean().exec(function (err, boads) {
	    if (err) {
	      _DefaultResponse2.default.sendError(res, 'error fetch data');
	    } else {
	      _DefaultResponse2.default.sendData(res, boads);
	    }
	  });
	});

	router.post('/', function (req, res, next) {
	  var boad = new _models.Boad({
	    name: req.body.name
	  });

	  boad.save(function (err, newBoad) {
	    if (err) {
	      _DefaultResponse2.default.sendError(res, 'error save data');
	    } else {
	      _DefaultResponse2.default.sendData(res, newBoad);
	    }
	  });
	});

	router.put("/:id", function (req, res, next) {
	  var name = req.body.name;
	  var id = req.params.id;

	  _models.Boad.findById(id, function (err, boad) {
	    if (err) {
	      sendError(res, 'error fetch data');
	    } else {
	      boad.name = name;
	      boad.save(function (err, newBoad) {
	        if (err) {
	          _DefaultResponse2.default.sendError(res, 'error save data');
	        } else {
	          _DefaultResponse2.default.sendData(res, newBoad);
	        }
	      });
	    }
	  });
	});

	router.delete('/:id', function (req, res, next) {
	  var id = req.params.id;

	  _RemoveModel2.default.removeBoad(id, function (err, boad) {
	    if (err) {
	      _DefaultResponse2.default.sendError(res, 'error remove model');
	    } else {
	      _DefaultResponse2.default.sendData(res, boad);
	    }
	  });
	});

	exports.default = router;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.FileCom = exports.Comment = exports.Task = exports.Todolist = exports.Label = exports.Card = exports.List = exports.Boad = undefined;

	var _mongoose = __webpack_require__(10);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var connection = _mongoose2.default.connect('mongodb://localhost/pm');

	var BoadSchema = new _mongoose2.default.Schema({
		name: String,
		date_create: { type: Date, default: Date.now }
	});

	var ListSchema = new _mongoose2.default.Schema({
		name: String,
		date_create: { type: Date, default: Date.now },
		boad: _mongoose2.default.Schema.Types.ObjectId
	});

	var CardSchema = new _mongoose2.default.Schema({
		name: String,
		description: String,
		date_create: { type: Date, default: Date.now },
		list: _mongoose2.default.Schema.Types.ObjectId
	});

	var LabelSchema = new _mongoose2.default.Schema({
		name: String,
		color: String,
		date_create: { type: Date, default: Date.now },
		card: _mongoose2.default.Schema.Types.ObjectId
	});

	var TodolistSchema = new _mongoose2.default.Schema({
		name: String,
		date_create: { type: Date, default: Date.now },
		card: _mongoose2.default.Schema.Types.ObjectId
	});

	var TaskSchema = new _mongoose2.default.Schema({
		name: String,
		complete: Boolean,
		date_create: { type: Date, default: Date.now },
		todolist: _mongoose2.default.Schema.Types.ObjectId
	});

	var CommentSchema = new _mongoose2.default.Schema({
		text: String,
		date_create: { type: Date, default: Date.now },
		card: _mongoose2.default.Schema.Types.ObjectId
	});

	var FileSchema = new _mongoose2.default.Schema({
		name: String,
		path: String,
		comment: _mongoose2.default.Schema.Types.ObjectId
	});

	var Boad = exports.Boad = _mongoose2.default.model('boad', BoadSchema);
	var List = exports.List = _mongoose2.default.model('list', ListSchema);
	var Card = exports.Card = _mongoose2.default.model('card', CardSchema);
	var Label = exports.Label = _mongoose2.default.model('label', LabelSchema);
	var Todolist = exports.Todolist = _mongoose2.default.model('todolist', TodolistSchema);
	var Task = exports.Task = _mongoose2.default.model('task', TaskSchema);
	var Comment = exports.Comment = _mongoose2.default.model('comment', CommentSchema);
	var FileCom = exports.FileCom = _mongoose2.default.model('filecom', FileSchema);

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DefaultResponse = function () {
	  function DefaultResponse() {
	    _classCallCheck(this, DefaultResponse);
	  }

	  _createClass(DefaultResponse, null, [{
	    key: 'sendError',


	    // error 500
	    value: function sendError(res, message) {
	      res.statusCode = 500;
	      res.statusMessage = message;
	      res.send({ error: true });
	    }

	    // response 200

	  }, {
	    key: 'sendData',
	    value: function sendData(res, data) {
	      res.statusCode = 200;
	      res.statusMessage = 'ok';
	      res.send(data); //auto Content-type.
	    }

	    //response 400

	  }, {
	    key: 'sendIncorrect',
	    value: function sendIncorrect(res, data) {
	      res.statusCode = 400;
	      res.statusMessage = data;
	      res.send(data);
	    }
	  }]);

	  return DefaultResponse;
	}();

	exports.default = DefaultResponse;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _models = __webpack_require__(9);

	var _async = __webpack_require__(13);

	var _async2 = _interopRequireDefault(_async);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RemoveModel = function () {
	    function RemoveModel() {
	        _classCallCheck(this, RemoveModel);
	    }

	    _createClass(RemoveModel, null, [{
	        key: 'removeLabel',
	        value: function removeLabel(id, callback) {
	            _models.Label.findById(id, function (err, label) {
	                if (err) {
	                    callback(err);
	                } else {
	                    label.remove(function (err, oldLabel) {
	                        callback(err, oldLabel);
	                    });
	                }
	            });
	        }
	    }, {
	        key: 'removeTask',
	        value: function removeTask(id, callback) {
	            _models.Task.findById(id, function (err, task) {
	                if (err) {
	                    callback(err);
	                } else {
	                    task.remove(function (err, oldTask) {
	                        callback(err, oldTask);
	                    });
	                }
	            });
	        }
	    }, {
	        key: 'removeComment',
	        value: function removeComment(id, callback) {
	            _models.Comment.findById(id, function (err, comment) {
	                if (err) {
	                    callback(err);
	                } else {
	                    comment.remove(function (err, oldComment) {
	                        callback(err, oldComment);
	                    });
	                }
	            });
	        }
	    }, {
	        key: 'removeTodolist',
	        value: function removeTodolist(id, callback) {
	            _models.Task.find({ todolist: id }, function (err, tasks) {
	                if (err) {
	                    callback(err);
	                } else {
	                    var calls = [];
	                    for (var i = 0; i < tasks.length; i++) {
	                        calls.push(RemoveModel.removeTask.bind(null, tasks[i]._id));
	                    }
	                    _async2.default.parallel(calls, function (err, result) {
	                        if (err) {
	                            callback(err);
	                        } else {
	                            _models.Todolist.findById(id, function (err, todolist) {
	                                if (err) {
	                                    callback(err);
	                                } else {
	                                    todolist.remove(function (err, oldTodolist) {
	                                        callback(null, oldTodolist);
	                                    });
	                                }
	                            });
	                        }
	                    });
	                }
	            });
	        }
	    }, {
	        key: 'removeCard',
	        value: function removeCard(id, callback) {
	            _async2.default.parallel([function (callback) {
	                RemoveModel._removeTodolistsFromCard(id, callback);
	            }, function (callback) {
	                RemoveModel._removeLabelsFromCard(id, callback);
	            }, function (callback) {
	                RemoveModel._removeCommentsFromCard(id, callback);
	            }], function (err, result) {
	                if (err) {
	                    callback(err);
	                } else {
	                    _models.Card.findById(id, function (err, card) {
	                        if (err) {
	                            callback(err);
	                        } else {
	                            card.remove(function (err, oldCard) {
	                                callback(err, oldCard);
	                            });
	                        }
	                    });
	                }
	            });
	        }
	    }, {
	        key: 'removeList',
	        value: function removeList(id, callback) {
	            _models.Card.find({ list: id }, function (err, cards) {
	                if (err) {
	                    callback(err);
	                } else {
	                    var calls = [];
	                    for (var i = 0; i < cards.length; i++) {
	                        calls.push(RemoveModel.removeCard.bind(null, cards[i]._id));
	                    }
	                    _async2.default.parallel(calls, function (err, result) {
	                        if (err) {
	                            callback(err);
	                        } else {
	                            _models.List.findById(id, function (err, list) {
	                                if (err) {
	                                    callback(err);
	                                } else {
	                                    list.remove(function (err, oldList) {
	                                        callback(err, oldList);
	                                    });
	                                }
	                            });
	                        }
	                    });
	                }
	            });
	        }
	    }, {
	        key: 'removeBoad',
	        value: function removeBoad(id, callback) {
	            _models.List.find({ boad: id }, function (err, lists) {
	                if (err) {
	                    callback(err);
	                } else {
	                    var calls = [];
	                    for (var i = 0; i < lists.length; i++) {
	                        calls.push(RemoveModel.removeList.bind(null, lists[i]._id));
	                    }
	                    _async2.default.parallel(calls, function (err, result) {
	                        if (err) {
	                            callback(err);
	                        } else {
	                            _models.Boad.findById(id, function (err, boad) {
	                                if (err) {
	                                    callback(err);
	                                } else {
	                                    boad.remove(function (err, oldBoad) {
	                                        callback(err, oldBoad);
	                                    });
	                                }
	                            });
	                        }
	                    });
	                }
	            });
	        }
	    }, {
	        key: '_removeLabelsFromCard',
	        value: function _removeLabelsFromCard(id, callback) {
	            _models.Label.find({ card: id }, function (err, labels) {
	                var calls = [];
	                for (var i = 0; i < labels.length; i++) {
	                    calls.push(RemoveModel.removeLabel.bind(null, labels[i]._id));
	                }
	                _async2.default.parallel(calls, function (err, result) {
	                    callback(err, result);
	                });
	            });
	        }
	    }, {
	        key: '_removeTodolistsFromCard',
	        value: function _removeTodolistsFromCard(id, callback) {
	            _models.Todolist.find({ card: id }, function (err, todolists) {
	                var calls = [];
	                for (var i = 0; i < todolists.length; i++) {
	                    calls.push(RemoveModel.removeTodolist.bind(null, todolists[i]._id));
	                }
	                _async2.default.parallel(calls, function (err, result) {
	                    callback(err, result);
	                });
	            });
	        }
	    }, {
	        key: '_removeCommentsFromCard',
	        value: function _removeCommentsFromCard(id, callback) {
	            _models.Comment.find({ card: id }, function (err, comments) {
	                var calls = [];
	                for (var i = 0; i < comments.length; i++) {
	                    calls.push(RemoveModel.removeComment.bind(null, comments[i]._id));
	                }
	                _async2.default.parallel(calls, function (err, result) {
	                    callback(err, result);
	                });
	            });
	        }
	    }]);

	    return RemoveModel;
	}();

	exports.default = RemoveModel;

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("async");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _DefaultResponse = __webpack_require__(11);

	var _DefaultResponse2 = _interopRequireDefault(_DefaultResponse);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	router.post("/", function (req, res, next) {
	  if (!req.body || !req.body.name) {
	    _DefaultResponse2.default.sendIncorrect(res, "Incorrect request.");
	  } else {
	    next();
	  }
	});

	router.put('/:id', function (req, res, next) {
	  if (!req.body || !req.body.name || !req.params || !req.params.id) {
	    _DefaultResponse2.default.sendIncorrect(res, "Incorrect request.");
	  } else {
	    next();
	  }
	});

	router.delete('/:id', function (req, res, next) {
	  if (!req.params || !req.params.id) {
	    _DefaultResponse2.default.sendIncorrect(res, "Incorrect request.");
	  } else {
	    next();
	  }
	});

	exports.default = router;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _DefaultResponse = __webpack_require__(11);

	var _DefaultResponse2 = _interopRequireDefault(_DefaultResponse);

	var _models = __webpack_require__(9);

	var _RemoveModel = __webpack_require__(12);

	var _RemoveModel2 = _interopRequireDefault(_RemoveModel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	router.post("/", function (req, res, next) {
	  var _req$body = req.body;
	  var name = _req$body.name;
	  var card = _req$body.card;

	  var todolist = new _models.Todolist({
	    name: name,
	    card: card
	  });
	  todolist.save(function (err, newTodolist) {
	    if (err) {
	      _DefaultResponse2.default.sendError(res, 'Error save data');
	    } else {
	      _DefaultResponse2.default.sendData(res, newTodolist);
	    }
	  });
	});

	router.put("/:id", function (req, res, next) {
	  var id = req.params.id;
	  var name = req.body.name;

	  _models.Todolist.findById(id, function (err, todolist) {
	    if (err) {
	      _DefaultResponse2.default.sendError(res, 'Error fetch data');
	    } else {
	      todolist.name = name;
	      todolist.save(function (err, upTodolist) {
	        if (err) {
	          _DefaultResponse2.default.sendError(res, 'Error save data');
	        } else {
	          _DefaultResponse2.default.sendData(res, upTodolist);
	        }
	      });
	    }
	  });
	});

	router.delete("/:id", function (req, res, next) {
	  var id = req.params.id;

	  _RemoveModel2.default.removeTodolist(id, function (err, todolist) {
	    if (err) {
	      _DefaultResponse2.default.sendError(res, 'error remove data');
	    } else {
	      _DefaultResponse2.default.sendData(res, todolist);
	    }
	  });
	});

	exports.default = router;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _models = __webpack_require__(9);

	var _DefaultResponse = __webpack_require__(11);

	var _DefaultResponse2 = _interopRequireDefault(_DefaultResponse);

	var _RemoveModel = __webpack_require__(12);

	var _RemoveModel2 = _interopRequireDefault(_RemoveModel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	router.post("/", function (req, res, next) {
	  var _req$body = req.body;
	  var name = _req$body.name;
	  var complete = _req$body.complete;
	  var todolist = _req$body.todolist;

	  var task = new _models.Task({
	    name: name,
	    complete: complete,
	    todolist: todolist
	  });
	  task.save(function (err, newTask) {
	    if (err) {
	      _DefaultResponse2.default.sendError(res, 'Error save data');
	    } else {
	      _DefaultResponse2.default.sendData(res, newTask);
	    }
	  });
	});

	router.put("/:id", function (req, res, next) {
	  var id = req.params.id;
	  var _req$body2 = req.body;
	  var name = _req$body2.name;
	  var complete = _req$body2.complete;

	  _models.Task.findById(id, function (err, task) {
	    if (err) {
	      _DefaultResponse2.default.sendError(res, 'Error fetch data');
	    } else {
	      task.name = name ? name : task.name;
	      task.complete = complete != undefined ? complete : task.complete;
	      task.save(function (err, upTask) {
	        if (err) {
	          _DefaultResponse2.default.sendError(res, 'Error save data');
	        } else {
	          _DefaultResponse2.default.sendData(res, upTask);
	        }
	      });
	    }
	  });
	});

	router.delete("/:id", function (req, res, next) {
	  var id = req.params.id;

	  console.log(id);
	  _RemoveModel2.default.removeTask(id, function (err, task) {
	    if (err) {
	      _DefaultResponse2.default.sendError(res, "error remove data");
	    } else {
	      _DefaultResponse2.default.sendData(res, task);
	    }
	  });
	});

	exports.default = router;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _DefaultResponse = __webpack_require__(11);

	var _DefaultResponse2 = _interopRequireDefault(_DefaultResponse);

	var _RemoveModel = __webpack_require__(12);

	var _RemoveModel2 = _interopRequireDefault(_RemoveModel);

	var _models = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	router.post("/", function (req, res, next) {
	  var _req$body = req.body;
	  var text = _req$body.text;
	  var card = _req$body.card;

	  var comment = new _models.Comment({
	    text: text,
	    card: card
	  });
	  comment.save(function (err, newComment) {
	    if (err) {
	      _DefaultResponse2.default.sendError(res, 'Error save data');
	    } else {
	      _DefaultResponse2.default.sendData(res, newComment);
	    }
	  });
	});

	router.put("/:id", function (req, res, next) {
	  var id = req.params.id;
	  var text = req.body.text;

	  _models.Comment.findById(id, function (err, comment) {
	    if (err) {
	      _DefaultResponse2.default.sendError(res, 'Error fetch data');
	    } else {
	      comment.text = text;
	      comment.save(function (err, upComment) {
	        if (err) {
	          _DefaultResponse2.default.sendError(res, 'Error save data');
	        } else {
	          _DefaultResponse2.default.sendData(res, upComment);
	        }
	      });
	    }
	  });
	});

	router.delete("/:id", function (req, res, next) {
	  var id = req.params.id;

	  _RemoveModel2.default.removeComment(id, function (err, comment) {
	    if (err) {
	      _DefaultResponse2.default.sendError(res, 'error remove model');
	    } else {
	      _DefaultResponse2.default.sendData(res, comment);
	    }
	  });
	});

	exports.default = router;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _models = __webpack_require__(9);

	var _DefaultResponse = __webpack_require__(11);

	var _DefaultResponse2 = _interopRequireDefault(_DefaultResponse);

	var _RemoveModel = __webpack_require__(12);

	var _RemoveModel2 = _interopRequireDefault(_RemoveModel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//https://code.visualstudio.com/docs/runtimes/nodejs

	var router = _express2.default.Router();

	router.post("/", function (req, res, next) {
	  var _req$body = req.body;
	  var name = _req$body.name;
	  var color = _req$body.color;
	  var card = _req$body.card;

	  var label = new _models.Label({
	    name: name,
	    color: color,
	    card: card
	  });
	  label.save(function (err, newLabel) {
	    if (err) {
	      _DefaultResponse2.default.sendError(res, 'Error save data');
	    } else {
	      _DefaultResponse2.default.sendData(res, newLabel);
	    }
	  });
	});

	router.put("/:id", function (req, res, next) {
	  var id = req.params.id;
	  var _req$body2 = req.body;
	  var name = _req$body2.name;
	  var color = _req$body2.color;

	  _models.Label.findById(id, function (err, label) {
	    if (err) {
	      _DefaultResponse2.default.sendError(res, 'Error fetch data');
	    } else {
	      label.name = name ? name : label.name;
	      label.color = color ? color : label.color;
	      label.save(function (err, upLabel) {
	        if (err) {
	          _DefaultResponse2.default.sendError(res, 'Error save data');
	        } else {
	          _DefaultResponse2.default.sendData(res, label);
	        }
	      });
	    }
	  });
	});

	router.delete("/:id", function (req, res, next) {
	  var id = req.params.id;

	  _RemoveModel2.default.removeLabel(id, function (err, label) {
	    if (err) {
	      _DefaultResponse2.default.sendError(res, 'error remove model');
	    } else {
	      _DefaultResponse2.default.sendData(res, label);
	    }
	  });
	});

	exports.default = router;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _models = __webpack_require__(9);

	var _DefaultResponse = __webpack_require__(11);

	var _DefaultResponse2 = _interopRequireDefault(_DefaultResponse);

	var _RemoveModel = __webpack_require__(12);

	var _RemoveModel2 = _interopRequireDefault(_RemoveModel);

	var _FetchModel = __webpack_require__(20);

	var _FetchModel2 = _interopRequireDefault(_FetchModel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	router.get("/:id_boad", function (req, res, next) {
	  _models.List.find({ boad: req.params.id_boad }).lean().exec(function (err, lists) {
	    if (err) {
	      _DefaultResponse2.default.sendError(res, 'error fetch data');
	    } else {
	      _FetchModel2.default.bindCards(lists, function (err, result) {
	        if (err) {
	          _DefaultResponse2.default.sendError(res, 'error fetch data');
	        } else {
	          _DefaultResponse2.default.sendData(res, lists);
	        }
	      });
	    }
	  });
	});

	router.post("/", function (req, res, next) {
	  var _req$body = req.body;
	  var name = _req$body.name;
	  var boad = _req$body.boad;

	  var list = new _models.List({
	    name: name,
	    boad: boad,
	    date_create: Date()
	  });

	  list.save(function (err, newList) {
	    if (err) {
	      _DefaultResponse2.default.sendError(res, 'error save data');
	    } else {
	      _DefaultResponse2.default.sendData(res, newList);
	    }
	  });
	});

	router.put("/:id", function (req, res, next) {
	  var name = req.body.name;
	  var id = req.params.id;

	  _models.List.findById(id, function (err, list) {
	    if (err) {
	      sendError(res, 'error fetch data');
	    } else {
	      list.name = name;
	      list.save(function (err, newList) {
	        if (err) {
	          _DefaultResponse2.default.sendError(res, 'error save data');
	        } else {
	          _DefaultResponse2.default.sendData(res, newList);
	        }
	      });
	    }
	  });
	});

	router.delete("/:id", function (req, res, next) {
	  var id = req.params.id;

	  _RemoveModel2.default.removeList(id, function (err, list) {
	    if (err) {
	      _DefaultResponse2.default.sendError(res, 'error remove data');
	    } else {
	      _DefaultResponse2.default.sendData(res, list);
	    }
	  });
	});

	exports.default = router;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _models = __webpack_require__(9);

	var _async = __webpack_require__(13);

	var _async2 = _interopRequireDefault(_async);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FetchModel = function () {
	  function FetchModel() {
	    _classCallCheck(this, FetchModel);
	  }

	  _createClass(FetchModel, null, [{
	    key: 'bindCards',
	    value: function bindCards(lists, callback) {
	      var calls = [];
	      for (var i = 0; i < lists.length; i++) {
	        calls.push(FetchModel._bindCards.bind(null, lists[i]));
	      }

	      _async2.default.parallel(calls, function (err, result) {
	        callback(err, lists);
	      });
	    }
	  }, {
	    key: '_bindCards',
	    value: function _bindCards(list, callback) {
	      _models.Card.find({ list: list._id }).lean().exec(function (err, cards) {
	        if (err) {
	          callback(err);
	        } else {
	          FetchModel._fillCards(cards, function (err, result) {
	            if (err) {
	              callback(err);
	            } else {
	              list.cards = cards;
	              callback(null, list);
	            }
	          });
	        }
	      });
	    }
	  }, {
	    key: '_fillCards',
	    value: function _fillCards(cards, callback) {
	      var calls = [];
	      for (var i = 0; i < cards.length; i++) {
	        calls.push(FetchModel._fillCard.bind(null, cards[i]));
	      }
	      _async2.default.parallel(calls, function (err, result) {
	        callback(err, cards);
	      });
	    }
	  }, {
	    key: '_fillCard',
	    value: function _fillCard(card, callback) {
	      _async2.default.parallel([function (callback) {
	        FetchModel._getComments(card, callback);
	      }, function (callback) {
	        FetchModel._getLabels(card, callback);
	      }, function (callback) {
	        FetchModel._getTodolists(card, callback);
	      }], function (err, result) {
	        callback(err, card);
	      });
	    }
	  }, {
	    key: '_getLabels',
	    value: function _getLabels(card, callback) {
	      _models.Label.find({ card: card._id }).lean().exec(function (err, labels) {
	        if (err) {
	          callback(err);
	        } else {
	          card.labels = labels;
	          callback(null, card);
	        }
	      });
	    }
	  }, {
	    key: '_getComments',
	    value: function _getComments(card, callback) {
	      _models.Comment.find({ card: card._id }).lean().exec(function (err, comments) {
	        if (err) {
	          callback(err);
	        } else {
	          card.comments = comments;
	          callback(null, comments);
	        }
	      });
	    }
	  }, {
	    key: '_getTodolists',
	    value: function _getTodolists(card, callback) {
	      _models.Todolist.find({ card: card._id }).lean().exec(function (err, todolists) {
	        var calls = [];
	        for (var i = 0; i < todolists.length; i++) {
	          calls.push(FetchModel._getTasks.bind(null, todolists[i]));
	        }
	        _async2.default.parallel(calls, function (err, result) {
	          if (err) {
	            callback(err);
	          } else {
	            card.todolists = todolists;
	            callback(null, card);
	          }
	        });
	      });
	    }
	  }, {
	    key: '_getTasks',
	    value: function _getTasks(todolist, callback) {
	      _models.Task.find({ todolist: todolist._id }).lean().exec(function (err, tasks) {
	        todolist.tasks = tasks;
	        callback(err, todolist);
	      });
	    }
	  }]);

	  return FetchModel;
	}();

	exports.default = FetchModel;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _DefaultResponse = __webpack_require__(11);

	var _DefaultResponse2 = _interopRequireDefault(_DefaultResponse);

	var _models = __webpack_require__(9);

	var _RemoveModel = __webpack_require__(12);

	var _RemoveModel2 = _interopRequireDefault(_RemoveModel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	router.post('/', function (req, res, next) {
	  var card = new _models.Card({
	    name: req.body.name,
	    description: req.body.description,
	    list: req.body.list,
	    date_create: Date()
	  });

	  card.save(function (err, newCard) {
	    if (err) {
	      _DefaultResponse2.default.sendError(res, 'error save data');
	    } else {
	      _DefaultResponse2.default.sendData(res, newCard);
	    }
	  });
	});

	router.put('/:id', function (req, res, next) {
	  var _req$body = req.body;
	  var name = _req$body.name;
	  var description = _req$body.description;
	  var id = req.params.id;

	  _models.Card.findById(id, function (err, card) {
	    if (err) {
	      sendError(res, 'error fetch data');
	    } else {
	      card.name = name ? name : card.name;
	      card.description = description ? description : card.description;
	      card.save(function (err, newCard) {
	        if (err) {
	          _DefaultResponse2.default.sendError(res, 'error save data');
	        } else {
	          _DefaultResponse2.default.sendData(res, newCard);
	        }
	      });
	    }
	  });
	});

	router.delete('/', function (req, res, next) {
	  var id = req.params.id;

	  _RemoveModel2.default.removeCard(id, function (err, card) {
	    if (err) {
	      _DefaultResponse2.default.sendError(res, "error remove model");
	    } else {
	      _DefaultResponse2.default.sendData(res, card);
	    }
	  });
	});

	exports.default = router;

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ }
/******/ ]);