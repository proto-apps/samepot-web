/**
 * @fileoverview Backbone model of Canvas.
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
  models.Canvas = Backbone.Model.extend({
    /**
     * Default attrubutes.
     */
    defaults: {
      id: null,
      problem: null,
      solution: null,
      key_metrics: null,
      unique_value: null,
      unfair_advantage: null,
      channels: null,
      customer: null,
      cost_structure: null,
      revenue_streams: null    
    },

    /**
     * Route URL for POST/PUT/DELETE.
     */
    url: function() {
      return util.uri.api.project('canvas');
    },

    /**
     * Validate attributes.
     */
    validate: function(attr, options) {
      if (util.string.isEmpty(attr.id)) {
        return 'must be required id.'
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
