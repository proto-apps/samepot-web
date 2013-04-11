/**
 * @fileoverview Backbone collection of Activity.
 * @author yo_waka
 */

if (!collections) {
  var collections = {};
}

(function() {
  'use strict';

  /**
   * @constructor
   * @extends {Backbone.Collection}
   */
  collections.Activities = Backbone.Collection.extend({
    /**
     * Reference to this collection's model.
     */
    model: models.Activity,

    /**
     * Used by "sync".
     */
    url: function() {
      return util.uri.api.project('activities');
    },

    /**
     * Create new item.
     */
    createItem: function(data, invalidHandler) {
      var model = new models.Activity(data);
      this.listenTo(model, 'invalid', invalidHandler);
      this.add(model);
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
