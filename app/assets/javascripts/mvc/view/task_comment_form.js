/**
 * @fileoverview Backbone View of task comment form.
 * @author yo_waka
 */

if (!views) {
  var views = {};
}

(function() {
  'use strict';

  views.TaskCommentForm = Backbone.View.extend({
    /**
     * Container element.
     */
    el: '#task-comment-form',

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
    },

    /**
     * @param {Event} evt .
     */
    handleSubmit: function(evt) {
      evt.preventDefault();

      var contentInput = this.$el.find('textarea[name="content"]');

      var content = contentInput.val();
      if (util.string.isEmpty(content)) {
        return false;
      }

      this.trigger('submit_form', {
        content: content
      });

      contentInput.val('');
    }
  });
})();
