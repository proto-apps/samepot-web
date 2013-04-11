/**
 * @fileoverview Backbone View of TaskInfo.
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
  views.TaskInfo = Backbone.View.extend({
    /**
     * Container element.
     */
    el: '#task-info',

    /**
     * DOM events specific to an item.
     */
    events: {
      'click .button.edit': 'handleEdit',
      'submit': 'handleSubmit',
      'click .cancel': 'handleCancel'
    },

    /**
     * @param {Object} options .
     */
    initialize: function(options) {
      this.template =  _.template($('#task-template').html());
      this.formTemplate = _.template($('#task-form-template').html());

      this.listenTo(this.model, 'change', this.render);
    },

    /**
     * (Re-)render the milestone item.
     */
    render: function() {
      // clear DOM
      this.$el.empty();

      var item = this.template(_.extend({id: this.model.id}, this.filterAttr()));
      this.$el.append(item);
    },

    /**
     * Render the milestone form.
     */
    renderForm: function() {
      // clear DOM
      this.$el.empty();

      var attr = this.filterAttr(true);

      var item = this.formTemplate(
          _.extend({id: this.model.id}, attr));
      this.$el.append(item);

      // setup selecter
      var milestone = attr.milestone ? attr.milestone.id : null;
      this.$el.find('select[name="milestone_id"]').val(milestone).selecter();

      var priority = attr.priority || null;
      this.$el.find('select[name="priority"]').val(priority).selecter();

      var assignee = attr.assignee ? attr.assignee.id : null;
      this.$el.find('select[name="assignee_id"]').val(assignee).selecter();

      var reviewer = attr.reviewer ? attr.reviewer.id : null;
      this.$el.find('select[name="reviewer_id"]').val(reviewer).selecter();
    },

    /**
     * @return {Object}
     */
    filterAttr: function(isForm) {
      var attr = _.clone(this.model.attributes);
      if (!isForm) {
        attr.name = util.string.escapeHTML(attr.name);
        if (attr.priority) {
          attr.priority = util.i18n.getMsg('enumerize.priority.' + attr.priority);
        }
      }
      attr.created_at = (new Date(attr.created_at)).toLocaleString();
      attr.updated_at = (new Date(attr.updated_at)).toLocaleString();
      return attr;
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
    handleSubmit: function(evt) {
      evt.preventDefault();

      var name = this.$el.find('input[name="name"]').val();
      if (util.string.isEmpty(name)) {
        return false;
      }

      var newObj = {
        name: name,
        milestone_id: this.$el.find('select[name="milestone_id"]').val(),
        priority: this.$el.find('select[name="priority"]').val(),
        assignee_id: this.$el.find('select[name="assignee_id"]').val(),
        reviewer_id: this.$el.find('select[name="reviewer_id"]').val(),
        description: this.$el.find('textarea[name="description"]').val()
      };
      if (this.model.changedAttributes(newObj)) {
        this.model.save(newObj);
      }

      return false;
    },

    /**
     * @param {Event} evt .
     */
    handleCancel: function(evt) {
      this.render();
    }
  });
})();
