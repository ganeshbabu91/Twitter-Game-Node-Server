var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

/* >> CUSTOM CODE STARTS FROM HERE << */

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Set up socket for this server
var http = require('http'),
    server = http.createServer(app),
    io = require('socket.io')(server),
    twitterModule = require('twitter');

stream = null;

// Set up twitter account for this game
var twitter = new twitterModule({
  consumer_key: 'Gb9Mmk98uXhFB4KgVbY6VhEWf',
  consumer_secret: 'txTZa0pr25p6WtyFZtvwzcWvkDEvrwqNDYgUwvZWapBuZuuVkm',
  access_token_key: '630011793-yd5PDsb01v6f5YbZI0myHtM8O2bYTErNOdWNaC4e',
  access_token_secret: '2ueuny4yCnd25kigxR7ly8DKCZNiStEOW01tDERjdiRHY'
});


// Socket Connection Setup
io.on('connection',function(client){
  // Handshake with client
  console.log("Client connecting...");
  client.emit('connected');

  // Start reading tweets once the client sends 'readTweets' event
  client.on("readTweets",function(trackJson, playersArray){
    // This is for testing purpose. Both parameters should come from UI
    var playersArray = ['messi','ronaldo'];
    var trackJson = {track: 'messi,ronaldo'};

    // Prepare output json
    var outputJson = {output:[]};
    for(i=0;i<input.playersArray;i++){
      outputJson.output.push({
        key: input[i],
        value: 0
      });
    }
    console.log("%o",outputJson);
    
    /*
      GAME CORE LOGIC - READ TWEETS AND COMPUTE SCORES
    */
    if(stream == null){
      twitter.stream('statuses/filter', {track: players},  function(stream) {
        stream.on('data', function(tweet) {
          var tweetText = tweet.text.toLowerCase();
          for(i=0;i<input.length;i++){
             if(tweetText.indexOf(input[i])!=-1){
               outputJson.output[i].value += 1; 
              }
          }
          console.log("output = %o",outputJson);
        });

        stream.on('error', function(error) {
          console.log("Oops!! %o",error);
        });
      });
    }
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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
