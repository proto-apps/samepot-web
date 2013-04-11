/**
 * @fileoverview Milestones edit page.
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
      this.collection = new collections.Milestones();

      // setup views
      var list = new views.MilestoneList({collection: this.collection});
      var form = new views.MilestoneForm();
      this.listenTo(form, 'submit_form', this.createItem);
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
        data: util.data.get('milestones')
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
  util.Routers.set('milestones', 'index', Router);
})();
