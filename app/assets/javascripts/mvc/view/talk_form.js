/**
 * @fileoverview Backbone View of talk form.
 * @author yo_waka
 */

if (!views) {
  var views = {};
}

(function() {
  'use strict';

  views.TalkForm = Backbone.View.extend({
    /**
     * Container element.
     */
    el: '#talk-form',

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

      var messageInput = this.$el.find('input[name="message"]');
      var message = messageInput.val();
      if (util.string.isEmpty(message)) {
        return false;
      }

      this.trigger('submit_form', message);
      messageInput.val('');
    }
  });
})();
