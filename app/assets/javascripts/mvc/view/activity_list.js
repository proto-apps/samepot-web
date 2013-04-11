/**
 * @fileoverview Backbone View of Activity list.
 * @author yo_waka
 */

if (!views) {
  var views = {};
}

(function() {
  'use strict';

  /**
   * @constructor
   * @extends {Backbone.View}
   */
  views.ActivityList = Backbone.View.extend({
    /**
     * Container element.
     */
    el: '#activity-list',

    /**
     * @param {Object} options .
     */
    initialize: function(options) {
      this.listenTo(this.collection, 'add', this.addItem);
      this.listenTo(this.collection, 'reset', this.render);
    },

    /**
     * @param {models.Activity} model .
     */
    addItem: function(model) {
      var view = new views.Activity({model: model});
      this.$el.prepend(view.render());
    }
  });
})();
