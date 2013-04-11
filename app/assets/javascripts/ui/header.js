/**
 * @fileoverview Global header.
 * @author yo_waka
 */

if (!ui) {
  var ui = {};
}


/**
 * @type {Object}
 */
ui.header = {};


(function() {
  /**
   */
  ui.header.init = function() {
    var userMenu = $('#header-user');
    if (userMenu.length > 0) {
      userMenu.bind('click', ui.header.toggleUserMenu);
    }
    var helpMenu = $('#header-help');
    if (helpMenu.length > 0) {
      helpMenu.bind('click', ui.header.toggleHelpMenu);
    }
  };

  ui.header.toggleUserMenu = function(evt) {
    var menu = $('#header-user-menu');
    if (menu.css('display') == 'none') {
      var target = $(evt.target);
      pos = target.offset();
      menu.css({
        top: pos.top + target.height() + 'px',
        right: $(window).width() - (pos.left + target.innerWidth()) + 'px'
      });
    }
    menu.toggle();
  };

  ui.header.toggleHelpMenu = function(evt) {
    var menu = $('#header-help-menu');
    if (menu.css('display') == 'none') {
      var target = $(evt.target);
      pos = target.offset();
      menu.css({
        top: pos.top + target.height() + 'px',
        right: $(window).width() - (pos.left + target.innerWidth()) + 'px'
      });
    }
    menu.toggle();
  };
})();
