/**
 * @fileoverview Backbone View of milestone form.
 * @author yo_waka
 */

if (!views) {
  var views = {};
}

(function() {
  'use strict';

  views.TaskForm = Backbone.View.extend({
    /**
     * Container element.
     */
    el: '#task-form',

    /**
     * DOM events specific to the form.
     */
    events: {
      'click .toggle': 'handleToggle',
      'submit': 'handleSubmit'
    },

    /**
     * @param {Object} options .
     */
    initialize: function(options) {
      // setup selecters
      this.$el.find('select[name="milestone_id"]').selecter();
      this.$el.find('select[name="priority"]').selecter();
      this.$el.find('select[name="assignee_id"]').selecter();
      this.$el.find('select[name="reviewer_id"]').selecter();
    },

    /**
     * @param {Event} evt .
     */
    handleToggle: function(evt) {
      $(evt.target).toggleClass('triangle-bottom').toggleClass('triangle-right');
      this.$el.find('.task-form-advanced').toggle();
    },

    /**
     * @param {Event} evt .
     */
    handleSubmit: function(evt) {
      evt.preventDefault();

      var nameInput = this.$el.find('input[name="name"]');
      var milestoneSelect = this.$el.find('select[name="milestone_id"]');
      var prioritySelect = this.$el.find('select[name="priority"]');
      var assigneeSelect = this.$el.find('select[name="assignee_id"]');
      var reviewerSelect = this.$el.find('select[name="reviewer_id"]');

      var name = nameInput.val();
      if (util.string.isEmpty(name)) {
        return false;
      }

      this.trigger('submit_form', {
        name: name,
        milestone_id: milestoneSelect.val(),
        priority: prioritySelect.val(),
        assignee_id: assigneeSelect.val(),
        reviewer_id: reviewerSelect.val()
      });

      nameInput.val('');
    }
  });
})();
