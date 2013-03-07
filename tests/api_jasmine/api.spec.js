var request = require('request'),
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

describe('api', function(){

  var api_server;

  beforeEach(function(done) {
    api_server = spawn('foreman', ['start']);
    setTimeout(done, 1000);
  });

  afterEach(function(done) {
    api_server.kill('SIGTERM');
    setTimeout(done, 1000);
  });

  it('add', function(done) {
    add(21, 21, function(err, res) {
      expect(err).toBeNull();
      expect(res).toBe(42);
      done();
    });
  });

  it('add negative', function(done) {
    add(53, -11, function(err, res) {
      expect(err).toBeNull();
      expect(res).toBe(42);
      done();
    });
  });

  it('add not 42', function(done) {
    add(13, 11, function(err, res) {
      expect(err).toBeNull();
      expect(res).toBe(24);
      done();
    });
  });

});
