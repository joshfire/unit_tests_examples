var ops = require('../../lib/ops'),
    assert = require('assert');

suite('mocha_ops', function() {
  test('add 20+22 should return 42', function() {
    assert.equal(42, ops.add(20, 22));
  });

  test('add should support negative numbers', function() {
    assert.equal(ops.add(63,-21), 42);
  });

  it('add should not always return 42', function() {
    assert.equal(ops.add(10,14), 24);
  });

});
