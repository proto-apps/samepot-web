/**
 * @fileoverview Project settings page.
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

      // profile form
      this.form = $('#project-form');
      this.form.bind('submit', _.bind(this.handleSubmit_, this));
    },

    /**
     * @param {Event} evt .
     * @private
     */
    handleSubmit_: function(evt) {
      var form = this.form;

      var options = {
        url: util.uri.api('projects'),
        type: 'POST',
        data: util.form.params('project', form)
      };

      util.form.send(options, form, function(result) {
        var project = result.result;
        location.href = util.uri.page(project.access_token);
        return;
      }, function(res) {
        var errors = $('#project-form-errors');
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
  util.Routers.set('projects', 'new', Router);
})();
