//= require spec_helper
//= require application

describe('util.string', function() {
  it('#isEmpty', function() {
    util.string.isEmpty('hoge').should.equal(false);
    util.string.isEmpty('').should.equal(true);
    util.string.isEmpty(' ').should.equal(true);
    util.string.isEmpty('　').should.equal(true);
    util.string.isEmpty('\xa0').should.equal(true);
  });

  it('#makeSafe', function() {
    util.string.makeSafe('hoge').should.equal('hoge');
    util.string.makeSafe(null).should.equal('');
    util.string.makeSafe(undefined).should.equal('');
    util.string.makeSafe(100).should.equal('100');
    util.string.makeSafe(false).should.equal('false');
  });

  it('#startsWith', function() {
    util.string.startsWith('hogehoge', 'hoge').should.equal(true);
    util.string.startsWith('hogehoge', 'h').should.equal(true);
    util.string.startsWith('hogehoge', 'w').should.equal(false);
  });

  it('#escapeHTML', function() {
    util.string.escapeHTML('<div>foo</div>')
        .should.equal('&lt;div&gt;foo&lt;/div&gt;');
    util.string.escapeHTML('<script>alert("xss");</script>')
        .should.equal('&lt;script&gt;alert("xss");&lt;/script&gt;');
  });

  it('#unescapeHTML', function() {
    util.string.unescapeHTML('&lt;div&gt;foo&lt;/div&gt;')
        .should.equal('<div>foo</div>');
    util.string.unescapeHTML('&lt;script&gt;alert("xss");&lt;/script&gt;')
        .should.equal('<script>alert("xss");</script>');
  });
});
