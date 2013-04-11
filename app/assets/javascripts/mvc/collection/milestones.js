/**
 * @fileoverview Backbone collection of Milestone.
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
  collections.Milestones = Backbone.Collection.extend({
    /**
     * Reference to this collection's model.
     */
    model: models.Milestone,

    /**
     * Create new item.
     */
    createItem: function(data, invalidHandler) {
      var model = new models.Milestone(data);
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
    }
  });
})();
