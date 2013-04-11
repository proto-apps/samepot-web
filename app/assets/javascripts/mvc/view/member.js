/**
 * @fileoverview Backbone View of Project member.
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
  views.Member = Backbone.View.extend({
    /**
     * A list tag.
     */
    tagName: 'li',

    /**
     * DOM events specific to an item.
     */
    events: {
      'click .button.delete': 'handleDelete'
    },

    /**
     * @param {Object} options .
     */
    initialize: function(options) {
      this.template =  _.template($('#member-template').html());
      this.listenTo(this.model, 'destroy', this.remove);
    },

    /**
     * (Re-)render the milestone item.
     */
    render: function() {
      // clear DOM
      this.$el.empty();

      var attr = _.clone(this.model.attributes);
      var item = this.template(_.extend({
        id: this.model.id,
      }, attr));
      this.$el.append(item);

      var current_project = util.data.get('current_project');
      var current_user = util.data.get('current_user');

      if (current_project.administrator_id === current_user.id &&
          current_user.id !== attr.id) {
        var button = $('<button></button>').addClass('button caution icon delete')
          .text(util.i18n.getMsg('action.delete'));
        this.$el.find('.list-action').append(button);
      }

      return this.$el;
    },

    /**
     * @param {Event} evt .
     */
    handleDelete: function(evt) {
      evt.preventDefault();

      var message = util.i18n.getMsg('members.confirm_delete');
      if (window.confirm(message)) {
        this.model.destroy();
      }
    }
  });
})();
