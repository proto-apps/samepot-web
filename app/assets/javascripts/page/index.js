/**
 * @fileoverview Login page.
 * @author yo_waka
 */

(function() {
  'use strict';


  /**
   * @extends {Backbone.Events}
   */
  var App = _.extend({
    /**
     * @param {Object} options .
     */
    initialize: function(options) {
      this.options = options;

      this.form = $('#login-form');
      this.form.bind('submit', _.bind(this.handleSubmit_, this));
    },

    /**
     * @param {Event} evt .
     * @private
     */
    handleSubmit_: function(evt) {
      var form = this.form;

      var options = {
        url: util.uri.api('auth/login'),
        type: 'POST',
        data: util.form.params('auth', form)
      };

      util.form.send(options, form, function(result) {
        var loc = util.uri.parse(location.href).params('redirect');
        location.href = loc || util.uri.page('home');
        return;
      }, function(res) {
        var errors = $('#login-form-errors');
        _.each(res.errors, function(err) {
          errors.append($('<div>').text(err));
        });
      });

      return false;
    }
  }, Backbone.Events);


  /**
   * @extends {Backbone.Router}
   */
  var Router = Backbone.Router.extend({
    /**
     */
    initialize: function() {
      this.app = _.extend({}, App);
      this.app.initialize({});
    }
  });


  // set
  util.Routers.set('sites', 'index', Router);
})();
