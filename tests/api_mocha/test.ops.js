var assert = require('assert'),
    request = require('request'),
    ops = require('../../lib/ops'),
    spawn = require('child_process').spawn;

var add = function(a, b, cbAdd) {
  var url = 'http://localhost:5000/add?a=' + a +'&b=' + b;
  request(url , function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var parsedBody = null;
      try {
        parsedBody = JSON.parse(body);
      }
      catch (e) {
        return cbAdd(e);
      }
      if (parsedBody.hasOwnProperty("res")) {
        return cbAdd(null, parsedBody.res);
      }
      return cbAdd("bad body: " + JSON.stringify(parsedBody));
    }
    return cbAdd("error or statusCode != 200");
  });
};


var api_server;

suite('ops', function() {

  setup(function(done) {
    api_server = spawn('foreman', ['start']);
    setTimeout(done, 1000);
  });

  teardown(function(done) {
    api_server.kill('SIGTERM');
    setTimeout(done, 1000);
  });

  test('add 20+22 should return 42', function(done) {
    add(20, 22, function(err, res) {
      assert.ifError(err);
      assert.equal(42, res);
      done();
    });
  });

  test('should fail', function(done) {
    add(20, 22, function(err, res) {
      throw new Error("boum");
      assert.ifError(err);
      assert.equal(42, res);
      done();
    });
  });

  test('should be okay', function(done) {
    add(20, 22, function(err, res) {
      assert.ifError(err);
      assert.equal(42, res);
      done();
    });
  });

});
