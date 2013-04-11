/**
 * @fileoverview Backbone collection of Task.
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
  collections.Tasks = Backbone.Collection.extend({
    /**
     * Reference to this collection's model.
     */
    model: models.Task,

    /**
     * Create new item.
     */
    createItem: function(data, invalidHandler) {
      var model = new models.Task(data);
      this.listenTo(model, 'invalid', invalidHandler);

      if (model.isNew()) {
        model.save();
      }
      this.add(model);
    },

    /**
     * Remove item.
     */
    removeItem: function(model) {
      this.stopListening(model, 'invalid', invalidHandler);
      this.remove(model);
    },

    /**
     * Sort by created_at desc.
     */
    comparator: function(model) {
      var date = new Date(model.get('created_at'));
      return -date.getTime();
    }
  });
})();
