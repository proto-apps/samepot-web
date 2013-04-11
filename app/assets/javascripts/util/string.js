/**
 * @fileoverview String functions.
 */

if (!util) {
  var util = {};
}


/**
 * @type {Object}
 */
util.string = {};


/**
 * @return {boolean} .
 */
util.string.isEmpty = function(str) {
  return /^[\s\xa0]*$/.test(str);
};


/**
 * @param {*} obj .
 * @return {string} .
 */
util.string.makeSafe = function(obj) {
  return obj == null ? '' : String(obj);
};


/**
 * @param {string} str .
 * @param {string} prefix .
 * @return {boolean} .
 */
util.string.startsWith = function(str, prefix) {
  return str.lastIndexOf(prefix, 0) == 0;
};


/**
 * @param {string} str .
 * @return {string} .
 */
util.string.escapeHTML = function(str) {
  return $('<div>').text(str).html();
};


/**
 * @param {string} str .
 * @return {string} .
 */
util.string.unescapeHTML = function(str) {
  return $('<div>').html(str).text();
};
