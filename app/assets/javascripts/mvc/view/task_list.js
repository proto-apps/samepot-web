/**
 * @fileoverview Backbone View of Task list.
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
  views.TaskList = Backbone.View.extend({
    /**
     * Container element.
     */
    el: '#task-list',

    /**
     * @param {Object} options .
     */
    initialize: function(options) {
      this.listenTo(this.collection, 'add', this.addItem);
      this.listenTo(this.collection, 'reset', this.render);
    },

    /**
     * @param {models.Task} model .
     */
    addItem: function(model) {
      var view = new views.Task({model: model});
      this.$el.prepend(view.render());
    }
  });
})();
