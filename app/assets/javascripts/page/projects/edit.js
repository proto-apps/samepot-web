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

      this.setupProjectForm_();
      this.setupImageForm_();
      this.setupDeleteForm_();
    },

    /**
     * @private
     */
    setupProjectForm_: function() {
      this.projectForm = $('#project-form');
      this.projectForm.bind('submit', _.bind(this.handleProjectSubmit_, this));
    },

    /**
     * @param {Event} evt .
     * @private
     */
    handleProjectSubmit_: function(evt) {
      var form = this.projectForm;

      var options = {
        url: util.uri.api.project(''),
        type: 'PUT',
        data: util.form.params('project', form)
      };

      util.form.send(options, form, function(result) {
        showNotification({
          message: 'Saved project setting',
          type: 'success',
          autoClose: true,
          duration: 3
        });
        return;
      }, function(res) {
        var errors = $('#project-form-errors');
        _.each(res.errors, function(err) {
          errors.append($('<div>').text(err));
        });
      });
      return false;
    },

    /**
     * @private
     */
    setupImageForm_: function() {
      var form = $('#project-image-form');
      util.form.sendFile(form, util.uri.api.project('image'));
    },

    /**
     * @private
     */
    setupDeleteForm_: function() {
      this.deleteForm = $('#project-delete-form');
      this.deleteForm.bind('submit', _.bind(this.handleDeleteSubmit_, this));
    },

    /**
     * @param {Event} evt .
     * @private
     */
    handleDeleteSubmit_: function(evt) {
      var form = this.deleteForm;
      if (form.find('button.delete').length == 0) {
        return false;
      }

      var message = util.i18n.getMsg('projects.confirm_delete');
      if (!window.confirm(message)) {
        return false;
      }

      var options = {
        url: util.uri.api.project(''),
        type: 'DELETE',
        data: util.form.params()
      };

      util.form.send(options, form, function(result) {
        showNotification({
          message: 'Deleted this project',
          type: 'success',
          autoClose: true,
          duration: 3
        });
        window.location.href = util.uri.page('home');
        return;
      }, function(res) {
        var errors = $('#project-delete-form-errors');
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
      ui.navi.init();

      this.app = _.extend({}, App);
      this.app.initialize({});
    }
  });


  // set
  util.Routers.set('projects', 'edit', Router);
})();
