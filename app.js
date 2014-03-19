/**
 * Module dependencies.
 * 12345
 * 67890
 */

// Client
  // Server
  var log = console.log;

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

var io = require('socket.io').listen(app);


io.sockets.on('connection', function (socket) { // 2
  log('connected');
  socket.on('msg send', function (msg) { // 4
    socket.emit('msg push', msg); // 5
    socket.broadcast.emit('msg push', msg); // 6
  });
  socket.on('disconnect', function() { // 9
    log('disconnected');
  });
});

