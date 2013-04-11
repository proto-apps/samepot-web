/**
 * @fileoverview Backbone view of Task filter.
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
  views.TaskFilter = Backbone.View.extend({
    /**
     * Container element.
     */
    el: '#task-filter',

    /**
     * DOM events specific to an item.
     */
    events: {
    },

    /**
     * @param {Object} options .
     */
    initialize: function(options) {
      this.$el.find('select[name="milestone_id"]').selecter()
        .change(_.bind(this.handleChangeFilter, this));
      this.$el.find('select[name="priority"]').selecter()
        .change(_.bind(this.handleChangeFilter, this));
      this.$el.find('select[name="status"]').selecter()
        .change(_.bind(this.handleChangeFilter, this));
      this.$el.find('select[name="assignee_id"]').selecter()
        .change(_.bind(this.handleChangeFilter, this));
      this.$el.find('select[name="reviewer_id"]').selecter()
        .change(_.bind(this.handleChangeFilter, this));
    },

    /**
     * @param {Event} evt .
     */
    handleChangeFilter: function(evt) {
      evt.preventDefault();     

      var target = $(evt.target);
      var data = {};
      var value = target.val();
      if (util.string.isEmpty(value)) {
        value = null;
      }
      data[target.attr('name')] = value;

      this.trigger('filter', data);
    }
  });
})();
