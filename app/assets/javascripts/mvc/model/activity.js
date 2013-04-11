/**
 * @fileoverview Backbone model of Activity.
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
  models.Activity = Backbone.Model.extend({
    /**
     * Default attrubutes.
     */
    defaults: {
      id: null,
      resource: null,
      action: null,
      content: null,
      linked_content: null,
      name: null,
      url: null,
      user: null,
      created_at: (new Date()).toLocaleString()
    },

    /**
     * Validate attributes.
     */
    validate: function(attr, options) {
      if (util.string.isEmpty(attr.resource)) {
        return 'resource must be required.'
      }
    }
  });
})();
