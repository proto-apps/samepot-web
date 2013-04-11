/**
 * @fileoverview Backbone View of TaskComment list.
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
  views.TaskCommentList = Backbone.View.extend({
    /**
     * Container element.
     */
    el: '#task-comment-list',

    /**
     * @param {Object} options .
     */
    initialize: function(options) {
      this.listenTo(this.collection, 'add', this.addItem);
    },

    /**
     * @param {models.TaskComment} model .
     */
    addItem: function(model) {
      var view = new views.TaskComment({model: model});
      this.$el.append(view.render());
    }
  });
})();
