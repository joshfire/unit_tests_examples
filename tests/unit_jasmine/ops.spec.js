var ops = require('../../lib/ops')

describe('jasmine_ops', function(){

  it('add', function() {
    expect(ops.add(21,21)).toEqual(42);
  });

  it('add_negative', function() {
    expect(ops.add(63,-21)).toEqual(42);
  });

  it('add_not_42', function() {
    expect(ops.add(42,24)).toEqual(66);
  });

});
