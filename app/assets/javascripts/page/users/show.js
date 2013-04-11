/**
 * @fileoverview User settings page.
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

      this.setupProfileForm_();
      this.setupImageForm_();
      this.setupDeleteForm_();
      this.setupNotification_();
    },

    /**
     * @private
     */
    setupProfileForm_: function() {
      this.profileForm = $('#user-profile-form');

      this.profileForm.find('input[name="birthday"]').datepicker();
      this.profileForm.find('select[name="locale"]').selecter();
      this.profileForm.find('select[name="timezone"]').selecter();

      this.profileForm.bind('submit', _.bind(this.handleProfileSubmit_, this));
    },

    /**
     * @param {Event} evt .
     * @private
     */
    handleProfileSubmit_: function(evt) {
      var form = this.profileForm;

      var options = {
        url: util.uri.api('my'),
        type: 'PUT',
        data: util.form.params('user', form)
      };

      util.form.send(options, form, function(result) {
        showNotification({
          message: util.i18n.getMsg('users.saved'),
          type: 'success',
          autoClose: true,
          duration: 3
        });

        return;
      }, function(res) {
        var errors = $('#profile-form-errors');
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
      var form = $('#user-image-form');
      util.form.sendFile(form, util.uri.api('my/image'));
    },

    /**
     * @private
     */
    setupDeleteForm_: function() {
      this.deleteForm = $('#user-delete-form');
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

      var message = util.i18n.getMsg('users.confirm_delete');
      if (!window.confirm(message)) {
        return false;
      }

      var options = {
        url: util.uri.api('my'),
        type: 'DELETE',
        data: util.form.params()
      };

      util.form.send(options, form, function(result) {
        showNotification({
          message: util.i18n.getMsg('users.deleted'),
          type: 'success',
          autoClose: true,
          duration: 3
        });
        window.location.href = util.uri.page('');
        return;
      }, function(res) {
        var errors = $('#user-delete-form-errors');
        _.each(res.errors, function(err) {
          errors.append($('<div>').text(err));
        });
      });

      return false;
    },

    /**
     * @private
     */
    setupNotification_: function() {
      if (!window.webkitNotifications) {
        return;
      }
      var dn = $('#desktop-notification-setting');

      // 0 is PERMISSION_ALLOWED
      if (window.webkitNotifications.checkPermission() == 0) {
        dn.append($('<span>').text(util.i18n.getMsg('users.dntf.done')));
      } else {
        var button = $('<button>').addClass('button primary icon chat')
                                  .text(util.i18n.getMsg('users.dntf.allow'));
        button.click(function(evt) {
          if (window.webkitNotifications.checkPermission() != 0) {
            window.webkitNotifications.requestPermission();
          }
        });
        dn.append(button);
      }
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
  util.Routers.set('users', 'show', Router);
})();
