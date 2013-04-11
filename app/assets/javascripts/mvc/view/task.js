/**
 * @fileoverview Backbone View of Task.
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
  views.Task = Backbone.View.extend({
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
      this.template =  _.template($('#task-template').html());

      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    /**
     * (Re-)render the milestone item.
     */
    render: function() {
      // clear DOM
      this.$el.empty();

      var item = this.template(_.extend({id: this.model.id}, this.filterAttr()));
      this.$el.append(item);
      
      // make link
      var link = this.$el.find('.link');
      link.attr('href', util.uri.page.project('tasks/' + this.model.id));
      var comments = this.model.attributes.comments;
      if (comments && comments.length > 0) {
        link.addClass('commented');
      }

      // add status class
      this.$el.find('.status').addClass(this.model.attributes.status);

      return this.$el;
    },

    /**
     * @param {Event} evt .
     */
    handleEdit: function(evt) {
      evt.preventDefault();
      this.renderForm();
    },

    /**
     * @param {Event} evt .
     */
    handleDelete: function(evt) {
      evt.preventDefault();

      var message = util.i18n.getMsg('tasks.confirm_delete');
      if (window.confirm(message)) {
        this.model.destroy();
      }
    },

    /**
     * @return {Object} .
     */
    filterAttr: function() {
      var obj = _.clone(this.model.attributes);
      if (obj.name) {
        obj.name = util.string.escapeHTML(obj.name);
      }
      if (obj.priority) {
        obj.priority = util.i18n.getMsg('enumerize.priority.' + obj.priority);
      }
      if (obj.status) {
        obj.status = util.i18n.getMsg('enumerize.status.' + obj.status);
      }
      return obj;
    }
  });
})();
