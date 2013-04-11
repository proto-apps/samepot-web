/**
 * @fileoverview Backbone View of Member invite form.
 * @author yo_waka
 */

if (!views) {
  var views = {};
}

(function() {
  'use strict';

  views.MemberForm = Backbone.View.extend({
    /**
     * Container element.
     */
    el: '#member-form',

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
      this.$el.find('input[name="email"]').attr('disabled', false);
      this.$el.find('.button').removeClass('disable');
    },

    /**
     * @param {Event} evt .
     */
    handleSubmit: function(evt) {
      evt.preventDefault();

      if (!util.data.get('enable_invite')) {
        return false;
      }

      var input = this.$el.find('input[name="email"]');
      var email = input.val();
      if (util.string.isEmpty(email)) {
        return false;
      }

      this.trigger('submit_form', {
        email: email
      });

      input.val('');
    }
  });
})();
