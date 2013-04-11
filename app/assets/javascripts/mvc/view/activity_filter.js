/**
 * @fileoverview Backbone View of activity filter.
 * @author yo_waka
 */

if (!views) {
  var views = {};
}

(function() {
  'use strict';

  views.ActivityFilter = Backbone.View.extend({
    /**
     * Container element.
     */
    el: '#activity-filter',

    /**
     * DOM events specific to the form.
     */
    events: {
      'click a': 'handleClick'
    },

    /**
     * @param {Event} evt .
     */
    handleClick: function(evt) {
      evt.preventDefault();

      var $target = $(evt.target);
      if ($target.hasClass('current')) {
        return;
      }

      var type = $target.attr('data-filter');
      this.trigger('filter', type);

      this.$el.find('.current').removeClass('current');
      $target.addClass('current');
    }
  });
})();
