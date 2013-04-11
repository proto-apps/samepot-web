/**
 * @fileoverview Backbone View of Canvas.
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
  views.Canvas = Backbone.View.extend({
    /**
     * DOM events specific to an item.
     */
    events: {
      'click .button.edit': 'handleEdit',
      'click .button.save': 'handleSave',
      'click .cancel': 'handleCancel'
    },

    /**
     * @param {Object} options .
     */
    initialize: function(options) {
      this.name = options.name;
      this.el = '#canvas-' + options.name;
      this.$el = $(this.el);
      this.template =  _.template($('#canvas-template').html());
      this.formTemplate = _.template($('#canvas-form-template').html());

      this.listenTo(this.model, 'change', this.render);
    },

    /**
     * (Re-)render the milestone item.
     */
    render: function() {
      // clear DOM
      this.$el.empty();

      var value = this.model.attributes[this.name];
      var item = this.template({
        id: this.model.id,
        name: util.i18n.getMsg('canvas.' + this.name),
        contents: value
      });

      this.$el.append(item);
    },

    /**
     * Render the milestone form.
     */
    renderForm: function() {
      // clear DOM
      this.$el.empty();

      var value = this.model.attributes[this.name];
      var item = this.formTemplate({
        id: this.model.id,
        name: util.i18n.getMsg('canvas.' + this.name),
        contents: value
      });

      this.$el.append(item);
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
    handleSave: function(evt) {
      evt.preventDefault();

      var newObj = _.clone(this.model.attributes);
      newObj[this.name] = this.$el.find('textarea').val();

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
