//= require spec_helper
//= require application

describe('util.data', function() {
  it('#set/get any value', function() {
    util.data.set('a', 'a');
    util.data.get('a').should.equal('a');

    util.data.set('b', 1);
    util.data.get('b').should.equal(1);

    util.data.set('c', [1,2,3]);
    util.data.get('c').length.should.equal(3);

    util.data.set('d', {foo: 'foo'});
    util.data.get('d').foo.should.equal('foo');
  });

  it('#set key includes dot', function() {
    util.data.set('foo.bar', 'bar');
    util.data.get('foo.bar').should.equal('bar');
  });
});
