/**
 * @fileoverview HTML5 Desktop Notification popup.
 * @author yo_waka
 */

if (!ui) {
  var ui = {};
}


/**
 * @type {Object}
 */
ui.dnPopup = {};


(function() {
  /**
   */
  ui.dnPopup.init = function() {
    // Check Desktop notification
    if (!window.webkitNotifications) {
      return;
    }

    // 0 is PERMISSION_ALLOWED
    if (window.webkitNotifications.checkPermission() == 0) {
      return;
    }

    ui.dnPopup.show();
  };


  /**
   */
  ui.dnPopup.show = function() {
    var popup = $('<div>').css({
      position: 'fixed',
      right: 0,
      bottom: 0,
      zIndex: 99999
    });
    var inner = $('<div>').css({
      margin: '5px',
      padding: '5px 5px',
      border: '1px solid #ddd',
      backgroundColor: '#fff;'
    });
    var button = $('<button>').addClass('button primary icon chat')
                              .text(util.i18n.getMsg('users.desktop_notification'));
    button.click(function(evt) {
      if (window.webkitNotifications.checkPermission() != 0) {
        window.webkitNotifications.requestPermission();
      }
    });
    
    popup.append(inner.append(button));
    $(document.body).append(popup);
  };
})();
