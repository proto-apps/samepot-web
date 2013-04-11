/**
 * @fileoverview Data storage from template.
 * @author yo_waka
 */

if (!util) {
  var util = {};
}


/**
 * @type {Object}
 */
util.data = {};


/**
 * @param {string} key .
 * @param {*} value .
 */
util.data.set = function(key, value) {
  util.data.store_[key] = value;
};


/**
 * @param {string} key .
 * @return {*} .
 */
util.data.get = function(key) {
  return util.data.store_[key] || null;
};


/**
 * @type {Object}
 * @private
 */
util.data.store_ = {};


/**
 * @param {Array.<Object>} data .
 * @param {string} key .
 * @return {Array.<Object>} .
 */
util.data.filterArray = function(data, key) {
  var newData = _.map(data, function(d) {
    return d[key];
  });
  return newData;
};


/**
 * @param {Array.<Object>} data .
 * @param {string} key .
 * @param {string} nameKey .
 * @param {string} valueKey .
 * @return {Array.<Object>} .
 */
util.data.filterForSelect = function(data, key, nameKey, valueKey) {
  var newData = _.map(data, function(d) {
    var obj = key ? d[key] : d;
    return {'name': obj[nameKey], 'value': obj[valueKey]};
  });
  return newData;
};


/**
 * @param {Array.<Object>} data .
 * @param {string} key .
 * @param {*} value .
 * @return {?Object} .
 */
util.data.getByValue = function(data, key, value) {
  return _.find(data, function(d) {
    return (d[key] === value);
  });
};
