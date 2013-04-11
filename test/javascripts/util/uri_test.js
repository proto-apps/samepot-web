//= require spec_helper
//= require application

describe('util.uri', function() {
  it('#page', function() {
    util.uri.page('my').should.equal('/my');
    util.uri.page('/my').should.equal('/my');
  });

  it('#api', function() {
    util.uri.api('users').should.equal('/api/users');
    util.uri.api('/users').should.equal('/api/users');
  });

  it('#page.project', function() {
    util.data.set('current_project', {access_token: 'abcde'});

    util.uri.page.project('users').should.equal('/abcde/users');
    util.uri.page.project('/users').should.equal('/abcde/users');
  });

  it('#page.project', function() {
    util.data.set('current_project', {access_token: 'abcde'});

    util.uri.api.project('users').should.equal('/api/abcde/users');
    util.uri.api.project('/users').should.equal('/api/abcde/users');
  });

  it('#css', function() {
    util.uri.css('application.css').should.equal('/assets/stylesheets/application.css');
    util.uri.css('/application.css').should.equal('/assets/stylesheets/application.css');
  });

  it('#js', function() {
    util.uri.js('application.js').should.equal('/assets/javascripts/application.js');
    util.uri.js('/application.js').should.equal('/assets/javascripts/application.js');
  });

  it('#image', function() {
    util.uri.image('icon/user.png').should.equal('/assets/images/icon/user.png');
    util.uri.image('/icon/user.png').should.equal('/assets/images/icon/user.png');
  });

  it('#staticPath', function() {
    util.uri.staticPath('icon/user.png').should.equal('/assets/icon/user.png');
    util.uri.staticPath('/icon/user.png').should.equal('/assets/icon/user.png');
  });
});
