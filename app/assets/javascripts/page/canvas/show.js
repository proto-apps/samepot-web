/**
 * @fileoverview Canvas show page.
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
      this.model = new models.Canvas();

      // setup views
      var problem = new views.Canvas({
        name: "problem", model: this.model});
      var solution = new views.Canvas({
        name: "solution", model: this.model});
      var keyMetrics = new views.Canvas({
        name: "key_metrics", model: this.model});
      var uniqueValue = new views.Canvas({
        name: "unique_value", model: this.model});
      var unfairAdvantage = new views.Canvas({
        name: "unfair_advantage", model: this.model});
      var channels = new views.Canvas({
        name: "channels", model: this.model});
      var customer = new views.Canvas({
        name: "customer", model: this.model});
      var costStructure = new views.Canvas({
        name: "cost_structure", model: this.model});
      var revenueStreams = new views.Canvas({
        name: "revenue_streams", model: this.model});
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
      this.model.set(this.options.data);
      this.wasRendered = true;
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
        data: util.data.get('canvas')
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


  // Set router
  util.Routers.set('canvas', 'show', Router);
})();
