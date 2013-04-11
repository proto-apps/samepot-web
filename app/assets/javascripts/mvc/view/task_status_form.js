/**
 * @fileoverview Backbone View of Task status.
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
  views.TaskStatusForm = Backbone.View.extend({
    /**
     * Container element.
     */
    el: '#task-status-form',

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
      // setup selecters
      this.$el.find('select[name="status"]').selecter();

      this.listenTo(this.model, 'change', this.render);
    },

    /**
     * (Re-)render the task status.
     */
    render: function() {
      var status = this.$el.find('.status');
      status.removeClass().addClass('status').addClass(this.model.get('status'));
      status.text(util.i18n.getMsg('enumerize.status.' + this.model.get('status')));
    },

    /**
     * @param {Event} evt .
     */
    handleSubmit: function(evt) {
      evt.preventDefault();

      var status = this.$el.find('select[name="status"]').val();
      if (this.model.attributes.status == status) {
        return false;
      }
      this.model.save('status', status);
    }
  });
})();
