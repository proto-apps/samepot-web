/**
 * @fileoverview Backbone View of Milestone list.
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
  views.MilestoneList = Backbone.View.extend({
    /**
     * Container element.
     */
    el: '#milestone-list',

    /**
     * @param {Object} options .
     */
    initialize: function(options) {
      this.listenTo(this.collection, 'add', this.addItem);
    },

    /**
     * @param {models.Milestone} model .
     */
    addItem: function(model) {
      var view = new views.Milestone({model: model});
      this.$el.append(view.render());
    }
  });
})();
