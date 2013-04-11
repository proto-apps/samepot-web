/**
 * @fileoverview Tasks index page.
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
      this.collection = new collections.Tasks();

      // setup add form
      var form = new views.TaskForm();
      this.listenTo(form, 'submit_form', this.createItem);

      // setup filter
      var filter = new views.TaskFilter();
      this.listenTo(filter, 'filter', this.filterItem);

      // setup list view
      var list = new views.TaskList({collection: this.collection});
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
    filterItem: function(data) {
      var loc = util.uri.parse(location.href);
      location.href = loc.build(data).href;
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
        data:  util.data.get('tasks').reverse()
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
  util.Routers.set('tasks', 'index', Router);
})();
