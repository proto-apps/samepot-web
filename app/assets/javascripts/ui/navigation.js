/**
 * @fileoverview The lamp of notification in the project.
 * @author yo_waka
 */

if (!ui) {
  var ui = {};
}

/**
 * @type {Object}
 */
ui.navi = {};


(function() {
  /**
   * @param {Object=} opt_options .
   */
  ui.navi.init = function(opt_options) {
    if ($('#navigation').length === 0) {
      return;
    }

    $('#project-management-menu').selecter({
      links: true
    });

    if (opt_options && opt_options.ignoreNotification) {
      return;
    }

    var socketio = util.SocketIO.getInstance();
    socketio.start();
    if (socketio.isRunning()) {
      socketio.setActivityHandler(ui.navi.lamp_);
    }
  };


  /**
   * @type {boolean}
   * @private
   */
  ui.navi.isLamped_ = false;

  /**
   * @type {string}
   * @private
   */
  ui.navi.onIconPath_ = util.uri.staticPath('icon/heart_on.png');

  /**
   * @param {Object} data .
   * @private
   */
  ui.navi.lamp_ = function(data) {
    if (data.user && data.user.id == util.data.get('current_user').id) {
      return;
    }
    ui.navi.showDesktopNotification_(data);

    var img = $('#navigation .ntf-lamp').find('img');
    img.attr('title', data.name || data.content || '');

    if (ui.navi.isLamped_) {
      return;
    }
    img.attr('src', ui.navi.onIconPath_);
    ui.navi.isLamped_ = true;
  };

  /**
   * @param {Object} data .
   * @private
   */
  ui.navi.showDesktopNotification_ = function(data) {
    if (!window.webkitNotifications ||
        // 0 is PERMISSION_ALLOWED
        window.webkitNotifications.checkPermission() != 0) {
      return;
    }

    var label = null;
    var tmpl = _.template(util.i18n.getMsg('activity.' + data.action));

    // talk is text
    if (data.resource == 'talk') {
      label = data.content;
    } else {
      switch (data.action) {
        case 'join':
        case 'birthday':
          label = tmpl({name: data.user.name});
          break;
        case 'create':
        case 'update':
        case 'destroy':
        case 'file':
          label = tmpl({name: data.name});
          break;
        case 'status':
          label = tmpl({
            name: data.name,
            content: util.i18n.getMsg('enumerize.status.' + data.content)
          });
          break;
        case 'comment':
          label = tmpl({name: data.name, content: data.content});
          break;
      }
    }
    if (!label) {
      return;
    }

    // function defined in step 2
    var ntf = window.webkitNotifications.createNotification(
        ui.navi.onIconPath_, data.user ? data.user.name : 'Samepot', label);
    ntf && ntf.show();
  };
})();
