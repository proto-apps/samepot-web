/**
 * @fileoverview Router(=page) initializer.
 * @author yo_waka
 */

if (!util) {
  var util = {};
}


/**
 * @type {Object}
 */
util.Routers = {};


/**
 * @type {Object}
 * @private
 */
util.Routers.routes_ = {};


/**
 * @param {string} controller .
 * @param {string} action .
 * @param {Backbone.Router} route .
 */
util.Routers.set = function(controller, action, route) {
  var routes = util.Routers.routes_;
  if (!routes[controller]) {
    routes[controller] = {};
  }
  routes[controller][action] = route;
};


/**
 * @param {string} controller .
 * @param {string} action .
 * @return {?Backbone.Router} .
 */
util.Routers.get = function(controller, action) {
  var routes = util.Routers.routes_;
  if (!routes[controller]) {
    return null;
  }
  return routes[controller][action];
};
