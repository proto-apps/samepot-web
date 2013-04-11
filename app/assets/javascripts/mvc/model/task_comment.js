/**
 * @fileoverview Backbone model of Task comment.
 * @author yo_waka
 */

if (!models) {
  var models = {};
}

(function() {
  'use strict';

  /**
   * @constructor
   * @extends {Backbone.Model}
   */
  models.TaskComment = Backbone.Model.extend({
    /**
     * Default attrubutes.
     */
    defaults: {
      id: null,
      content: null,
      linked_content: null,
      creator: {id: null, name: ''}
    },

    /**
     * Route URL for POST/PUT/DELETE.
     */
    urlRoot: function() {
      return util.uri.api.project(
        'tasks/' + util.data.get('task').id + '/comments');
    },

    /**
     * Validate attributes.
     */
    validate: function(attr, options) {
      if (util.string.isEmpty(attr.content)) {
        return 'must be more than 1 character.'
      }
    },

    /**
     * Call after xhr.
     *
     * @override
     */
    parse: function(resp, options) {
      return (resp.success) ? resp.result || null : null;
    }
  });
})();
