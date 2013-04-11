/**
 * @fileoverview Before comfirm to delete item.
 * @author yo_waka
 */

!function($) {

  'use strict';

  function Deletable($el, message, ajaxOptions, callback, errback) {
    this.message_ = message;
    this.ajaxOptions_ = ajaxOptions;
    this.callback_ = callback;
    this.errback_ = errback;

    $el.on('click', $.proxy(this.click_, this));
  }

  Deletable.prototype.click_ = function(evt) {
    if (!window.confirm(this.message_)) {
      return;
    }
    $.ajax(this.ajaxOptions_)
     .done(this.callback_)
     .fail(this.errback_);
  };


  /**
   * @param {string} message .
   * @param {Object} ajaxOptions .
   * @param {Function} callback .
   * @param {Function} errback .
   */
  $.fn.deletable = function(message, ajaxOptions, callback, errback) {
    return this.each(function() {
      new Deletable($(this), message, ajaxOptions, callback, errback);
    });
  };

  /**
   * Import to globals
   */
  $.fn.Deletable = Deletable;

}(window.jQuery);
