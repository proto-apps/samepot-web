/**
 * @fileoverview Backbone View of Activity.
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
  views.Activity = Backbone.View.extend({
    /**
     * A list tag.
     */
    tagName: 'li',

    /**
     * @param {Object} options .
     */
    initialize: function(options) {
      this.template = _.template($('#activity-template').html());
      this.listenTo(this.model, 'change', this.render);
    },

    /**
     * (Re-)render the milestone item.
     */
    render: function() {
      // clear DOM
      this.$el.empty();

      var item = this.template(
        _.extend({id: this.model.id}, this.filterAttr()));
      this.$el.append(item);

      var icon = this.createIcon();
      this.$el.find('.icon').append(icon);

      var body = this.createBody();
      this.$el.find('.body').append(body);

      return this.$el;
    },

    /**
     * @return {Object}
     */
    filterAttr: function() {
      var attr = _.clone(this.model.attributes);

      if (!attr.user) {
        attr.user = {name: ' '};
      }
      var dt = moment(attr.created_at);
      attr.created_at = (0 > dt.diff(moment(), 'days')) ? dt.format('YYYY-MM-DD H:mm') : dt.format('H:mm');

      return attr;
    },

    /**
     * @return {jQuery} .
     */
    createIcon: function() {
      var src = (this.model.has('user') && this.model.get('user').image_token) ?
        util.uri.page('blobs/image/' + this.model.get('user').image_token + '/small') :
        util.uri.staticPath('icon/user_14x18.png');
      var icon = $('<img>').attr('src', src);
      return icon;
    },

    /**
     * @return {jQuery} .
     */
    createBody: function() {
      var resource = this.model.get('resource');
      var action = this.model.get('action');
      
      // talk is text
      if (resource == 'talk') {
        return $('<span>').html(this.model.get('linked_content'));
      }

      var label = null;
      var tmpl = _.template(util.i18n.getMsg('activity.' + action));

      if (resource == 'canvas') {
        var label = tmpl({name: util.i18n.getMsg('navi.canvas')});
        var item = $('<a>').attr('href', this.model.get('url')).text(label);
        return item;
      }

      switch (action) {
        case 'join':
        case 'birthday':
          label = tmpl({name: this.model.get('user') ? this.model.get('user').name : ''});
          return $('<span>').text(label);
        case 'create':
        case 'update':
        case 'destroy':
          label = tmpl({name: this.model.get('name') || ''});
          break;
        case 'status':
          label = tmpl({
            name: this.model.get('name') || '',
            content: util.i18n.getMsg('enumerize.status.' + this.model.get('content'))
          });
          break;
        case 'comment':
          label = tmpl({
            name: this.model.get('name') || '',
            content: this.model.get('content')
          });
          break;
        case 'file':
          label = tmpl({name: this.model.get('name') || ''});
          break;
      }
      var item = $('<a>').attr('href', this.model.get('url')).text(label);
      return item;
    }
  });
})();
