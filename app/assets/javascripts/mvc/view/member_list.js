/**
 * @fileoverview Backbone View of Project member list.
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
  views.MemberList = Backbone.View.extend({
    /**
     * Container element.
     */
    el: '#member-list',

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
      var view = new views.Member({model: model});
      this.$el.append(view.render());
    }
  });
})();
