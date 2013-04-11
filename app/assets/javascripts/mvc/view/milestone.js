/**
 * @fileoverview Backbone View of Milestone.
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
  views.Milestone = Backbone.View.extend({
    /**
     * A list tag.
     */
    tagName: 'li',

    /**
     * DOM events specific to an item.
     */
    events: {
      'click .button.edit': 'handleEdit',
      'click .button.delete': 'handleDelete',
      'click .button.save': 'handleSave',
      'click .cancel': 'handleCancel'
    },

    /**
     * @param {Object} options .
     */
    initialize: function(options) {
      this.template =  _.template($('#milestone-template').html());
      this.formTemplate = _.template($('#milestone-form-template').html());

      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    /**
     * (Re-)render the milestone item.
     */
    render: function() {
      // clear DOM
      this.$el.empty();

      var item = this.template(_.extend({id: this.model.id}, this.model.attributes));
      this.$el.append(item);
      return this.$el;
    },

    /**
     * Render the milestone form.
     */
    renderForm: function() {
      // clear DOM
      this.$el.empty();

      var item = this.formTemplate(_.extend({id: this.model.id}, this.model.attributes));
      this.$el.append(item);

      // setup datepicker
      this.$el.find('input[name="start_day"]').datepicker();
      this.$el.find('input[name=end_day]').datepicker();
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

      var message = util.i18n.getMsg('milestones.confirm_delete');
      if (window.confirm(message)) {
        this.model.destroy();
      }
    },

    /**
     * @param {Event} evt .
     */
    handleSave: function(evt) {
      evt.preventDefault();

      var name = this.$el.find('input[name="name"]').val();
      if (util.string.isEmpty(name)) {
        return false;
      }

      var newObj = {
        name: name,
        start_day: this.$el.find('input[name="start_day"]').val(),
        end_day: this.$el.find('input[name="end_day"]').val()
      };
      if (this.model.changedAttributes(newObj)) {
        this.model.save(newObj);
      }
    },

    /**
     * @param {Event} evt .
     */
    handleCancel: function(evt) {
      this.render();
    }
  });
})();
