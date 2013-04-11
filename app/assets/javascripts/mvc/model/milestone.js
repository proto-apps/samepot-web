/**
 * @fileoverview Backbone model of Milestone.
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
  models.Milestone = Backbone.Model.extend({
    /**
     * Default attrubutes.
     */
    defaults: {
      id: null,
      name: null,
      start_day: null,
      end_day: null
    },

    /**
     * Route URL for POST/PUT/DELETE.
     */
    urlRoot: function() {
      return util.uri.api.project('milestones');
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
      return (resp.success) ? resp.result : null;
    }
  });
})();
