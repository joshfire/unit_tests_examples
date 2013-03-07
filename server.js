var express = require('express'),
  conf = require('./conf'),
  ops = require('./lib/ops');

var app = express.createServer();
app.configure( function () {
  app.use(express.bodyParser());
});

app.get('/', function(req, res) {
  res.send('Hello World');
});

app.get('/add', function(req, res) {
  var opres = ops.add(parseInt(req.query.a), parseInt(req.query.b));
  res.send({res: opres});
});

app.get('/bad-add', function(req, res) {
  var opres = ops.add(req.query.a, req.query.b);
  res.send({res: opres});
});

app.listen(conf.server.port);
console.log('Listening on ' + conf.server.host + ':' + conf.server.port);
