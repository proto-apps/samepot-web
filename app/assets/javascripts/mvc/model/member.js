/**
 * @fileoverview Backbone model of Project member.
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
  models.Member = Backbone.Model.extend({
    /**
     * Default attrubutes.
     */
    defaults: {
      id: null,
      name: null,
      email: null
    },

    /**
     * Route URL for POST/PUT/DELETE.
     */
    urlRoot: function() {
      return util.uri.api.project('members');
    },

    /**
     * Validate attributes.
     */
    validate: function(attr, options) {
      if (util.string.isEmpty(attr.id)) {
        return 'id must be required.'
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
