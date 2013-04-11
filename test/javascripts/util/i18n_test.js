//= require spec_helper
//= require application
//= require locales/en

describe('util.i18n', function() {
  it('#getMsg', function() {
    var title = util.i18n.getMsg('sites.index.title');
    title.should.equal('Samepot');
  });

  it('#getMsg is default value', function() {
    var title = util.i18n.getMsg('not.defined.title', 'Samepot');
    title.should.equal('Samepot');
  });
});
