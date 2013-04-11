/**
 * @fileoverview Project top page.
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
      this.collection = new collections.Activities();

      var form = new views.TalkForm();
      var filter = new views.ActivityFilter();
      var list = new views.ActivityList({collection: this.collection});

      this.listenTo(form, 'submit_form', this.submitTalk);
      this.listenTo(filter, 'filter', this.filterItems);

      var socketio = util.SocketIO.getInstance();
      socketio.start();
      if (socketio.isRunning()) {
        socketio.setActivityHandler(this.createItem, this);
      }
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
     * @param {string} message .
     */
    submitTalk: function(message) {
      var params = {
        'authenticity_token': util.data.get('authenticity_token'),
        'talk': {
          'message': message
        }
      };

      $.ajax({
        type: 'POST',
        url: util.uri.api.project('talks'),
        dataType: 'json',
        data: params
      })
      .done(function(res) {
      })
      .fail(function(xhr) {
        var res = $.parseJSON(xhr.responseText);
        console.log(res.errors);
      });
    },

    /**
     * @param {string} term .
     */
    filterItems: function(term) {
      this.collection.fetch({
        data: {'term': term || 'today'},
        update: true
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
      ui.navi.init({ignoreNotification: true});

      this.app = _.extend({}, App);
      this.app.initialize({
        data: util.data.get('activities')
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
  util.Routers.set('projects', 'show', Router);
})();
