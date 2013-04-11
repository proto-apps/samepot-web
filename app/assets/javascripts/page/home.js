/**
 * @fileoverview My page.
 */

(function() {
  /**
   * @extends {Backbone.Router}
   */
  var Router = Backbone.Router.extend({
    /**
     */
    initialize: function() {
    }
  });


  // set
  util.Routers.set('home', 'index', Router);
})();
