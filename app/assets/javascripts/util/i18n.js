/**
 * @fileoverview Utilities of i18n.
 * @author yo_waka
 */

if (!util) {
  var util = {};
}

/**
 * @type {Object}
 */
util.i18n = {};


/**
 * Convert a string to internationalized string.
 *
 * @param {string} key source string.
 * @param {string=} default_opt default string for unregistered string.
 * @return {string} internationalized string.
 */
util.i18n.getMsg = function(key, default_opt) {
    var splittedKey = key.split(/\./g);
    var value = util.i18n.findCircularKeys(splittedKey);
    if (value) {
        return value;
    }
    return default_opt || splittedKey[splittedKey.length - 1];
};


/**
 * @param {Array.<string>} keys .
 * @return {?string} .
 */
util.i18n.findCircularKeys = function(keys) {
    if (!MESSAGES) {
        return null;
    }

    var value = null;
    var len = keys.length;
    var tmp = MESSAGES;

    for (var i = 0; i < len; i++) {
        tmp = tmp[keys[i]];
        if (!tmp) {
            break;
        }
        if (i === len - 1) {
            value = tmp;
            break;
        }
    }
    return value;
};
