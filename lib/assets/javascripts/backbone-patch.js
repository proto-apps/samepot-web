/**
 * @fileoverview Patches for Backbone.js.
 * @author yo_waka
 */


/**
 * @override
 */
Backbone.ajax = function() {
  var http = arguments[0];

  if (http.type && http.type !== "GET") {
    http.contentType = "application/json";
    var data = {};
    if (http.data) {
      if (typeof http.data === "string") {
        data = JSON.parse(http.data);
      } else {
        data = http.data;
      }
    }
    data['authenticity_token'] = util.data.get('authenticity_token');
    arguments[0].data = JSON.stringify(data);
  }

  $('.container').activity();

  return Backbone.$.ajax.apply(Backbone.$, arguments)
  .done(function() {
    $('.container').activity(false);
  
    if (http.type && http.type !== "GET") {
      showNotification({
        type: 'success',
        message: util.i18n.getMsg('common.succeeded'),
        autoClose: true,
        duration: 3
      });
    }
  })
  .fail(function(xhr) {
    $('.container').activity(false);
    showNotification({
      type: 'error',
      message: util.i18n.getMsg('errors.request'),
      autoClose: true,
      duration: 3
    });
  });
}
