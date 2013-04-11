// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery.ui.datepicker
//= require jquery.ui.datepicker-ja
//= require jquery-fileupload/basic
//= require jquery.fs.selecter
//= require activity-indicator
//= require jquery_notification_v.1
//= require underscore-min
//= require backbone-min
//= require backbone-patch
//= require moment.min
//= require_tree ./util
//= require_tree ./ui
//= require_tree ./mvc/model
//= require_tree ./mvc/collection
//= require_tree ./mvc/view
//= require_tree ./page


/**
 * Dispatch Backbone Router when onload.
 */

$(function() {
  // if login user
  if (util.data.get('current_user') !== null) {
    ui.header.init();
    ui.dnPopup.init();
  }

  var controller = util.data.get('controller');
  var action = util.data.get('action');

  if (controller && action) {
    try {
      var Router = util.Routers.get(controller, action);
      window.router = new Router();
    } catch (err) {
      console.log && console.log(err.message);
    }
  }
  // Start!
  Backbone.history.start();
});
