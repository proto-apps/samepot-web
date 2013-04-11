/**
 * @fileoverview This page from invitation mail.
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

      if (util.data.get('is_new')) {
        this.form = $('#signup-form');
        this.form.bind('submit', _.bind(this.handleSubmit_, this));
      } else {
        setTimeout(function() {
          var project = util.data.get('project');
          location.href = util.uri.page(project.access_token);
        }, 5000);
      }
    },

    /**
     * @param {Event} evt .
     * @private
     */
    handleSubmit_: function(evt) {
      var form = this.form;

      var options = {
        url: util.uri.api('auth/signup_with_invite'),
        type: 'POST',
        data: util.form.params('auth', form)
      };

      util.form.send(options, form, function(result) {
        location.reload(true);
        return;
      }, function(res) {
        var errors = $('#errors').empty();
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
  util.Routers.set('sites', 'invite', Router);
})();
