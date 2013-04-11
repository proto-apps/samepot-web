/**
 * @fileoverview Backbone model of Task.
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
  models.Task = Backbone.Model.extend({
    /**
     * Default attrubutes.
     */
    defaults: {
      id: null,
      name: null,
      milestone: {id: null, name: ''},
      priority: null,
      status: null,
      assignee: {id: null, name: ''},
      reviewer: {id: null, name: ''}
    },

    /**
     * Route URL for POST/PUT/DELETE.
     */
    urlRoot: function() {
      return util.uri.api.project('tasks');
    },

    /**
     * Validate attributes.
     */
    validate: function(attr, options) {
      if (util.string.isEmpty(attr.name)) {
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
