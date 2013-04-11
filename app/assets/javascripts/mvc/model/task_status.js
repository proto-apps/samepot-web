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
  models.TaskStatus = Backbone.Model.extend({
    /**
     * Default attrubutes.
     */
    defaults: {
      id: null,
      status: null
    },

    /**
     * Route URL for POST/PUT/DELETE.
     */
    urlRoot: function() {
      return util.uri.api.project('tasks/status');
    },

    /**
     * Validate attributes.
     */
    validate: function(attr, options) {
      if (!attr.id) {
        return 'This model must have id attr.'
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
