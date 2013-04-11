/**
 * @fileoverview Project members page.
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
      this.collection = new collections.Members();

      // setup list view
      var list = new views.MemberList({collection: this.collection});

      // setup form view
      var form = new views.MemberForm();
      this.listenTo(form, 'submit_form', this.handleInvite);
    },

    /**
     * @type {boolean}
     */
    wasRendered: false,

    /**
     */
    renderAll: function() {
      if (this.wasRendered) {
        return;
      }
      _.each(this.options.data, _.bind(function(data) {
        this.createItem(data);
      }, this));
      this.wasRendered = true;
    },

    /**
     * @param {Object} data .
     */
    createItem: function(data) {
      this.collection.createItem(data, this.invalidHandler);
    },

    /**
     * @param {Object} model .
     * @param {Object} attrs .
     * @param {Object} options .
     */
    invalidHandler: function(model, attrs, options) {
      alert(model.validationError);
    },

    /**
     * @param {Object} data .
     */
    handleInvite: function(data) {
      var form = $('#member-form');
      var params = {member: {}};
      _.each(form.serializeArray(), function(input) {
        params.member[input.name] = input.value;
      });
      params['authenticity_token'] = util.data.get('authenticity_token');

      form.activity();

      $.ajax({
        url: util.uri.api.project('members'),
        type: 'POST',
        data: params,
        dataType: 'json'
      })
      .done(function(result) {
        form.activity(false);
        showNotification({
          message: util.i18n.getMsg('members.send'),
          type: 'error',
          autoClose: true,
          duration: 3
        });

        return;
      })
      .fail(function(xhr) {
        form.activity(false);
        showNotification({
          message: util.i18n.getMsg('errors.request'),
          type: 'error',
          autoClose: true,
          duration: 3
        });

        var res = $.parseJSON(xhr.responseText);
        var errors = $('#invite_errors');

        _.each(res.errors, function(err) {
          errors.append($('<div>').text(err));
        });
      });
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
      this.app.initialize({
        data: util.data.get('members')
      });
    },

    /**
     */
    routes: {
      '*action': 'defaultAction'
    },

    /**
     */
    defaultAction: function() {
      this.app.renderAll();
    }
  });


  // set
  util.Routers.set('members', 'index', Router);
})();
