/**
 * @fileoverview Backbone View of TaskComment.
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
  views.TaskComment = Backbone.View.extend({
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
      this.template =  _.template($('#task-comment-template').html());
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    /**
     * (Re-)render the milestone item.
     */
    render: function() {
      // clear DOM
      this.$el.empty();

      var attr = _.clone(this.model.attributes);
      attr.created_at = (new Date(attr.created_at)).toLocaleString();

      var image = attr.creator && attr.creator.image_token ? 
        util.uri.page('blobs/image/' + attr.creator.image_token + '/large') :
        util.uri.staticPath('icon/user_36x48.png');

      var item = this.template(_.extend({
        id: this.model.id,
        image: image
      }, attr));
      this.$el.append(item);

      var project = util.data.get('current_project');
      var user = util.data.get('current_user');
      if (project.administrator_id == user.id || (attr.creator && attr.creator.id == user.id)) {
        var button = $('<button></button>').addClass('button caution delete')
                     .text(util.i18n.getMsg('action.delete'));
        this.$el.find('.actions').append(button);
      }

      return this.$el;
    },

    /**
     * @param {Event} evt .
     */
    handleDelete: function(evt) {
      evt.preventDefault();
      this.model.destroy();
    }
  });
})();
