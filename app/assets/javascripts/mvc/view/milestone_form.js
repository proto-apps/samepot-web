/**
 * @fileoverview Backbone View of milestone form.
 * @author yo_waka
 */

if (!views) {
  var views = {};
}

(function() {
  'use strict';

  views.MilestoneForm = Backbone.View.extend({
    /**
     * Container element.
     */
    el: '#milestone-form',

    /**
     * DOM events specific to the form.
     */
    events: {
      'submit': 'handleSubmit'
    },

    /**
     * @param {Object} options .
     */
    initialize: function(options) {
      // setup datepicker
      this.$el.find('input[name="start_day"]').datepicker();
      this.$el.find('input[name=end_day]').datepicker();
    },

    /**
     * @param {Event} evt .
     */
    handleSubmit: function(evt) {
      evt.preventDefault();

      var nameInput = this.$el.find('input[name="name"]');
      var startDayInput = this.$el.find('input[name="start_day"]');
      var endDayInput = this.$el.find('input[name=end_day]');

      var name = nameInput.val();
      if (util.string.isEmpty(name)) {
        return false;
      }

      this.trigger('submit_form', {
        name: name,
        start_day: startDayInput.val(),
        end_day: endDayInput.val()
      });

      nameInput.val('');
      startDayInput.val('');
      endDayInput.val('');
    }
  });
})();
