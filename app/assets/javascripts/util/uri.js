/**
 * @fileoverview Create URLs in util.
 */

if (!util) {
  var util = {};
}


/**
 * @type {Object}
 */
util.uri = {};


/**
 * @const
 * @type {string}
 */
util.uri.BASE_PATH = '';


/**
 * @const
 * @type {string}
 */
util.uri.STATIC_PATH = 'assets';


/**
 * @param {string} path .
 * @return {string} .
 */
util.uri.page = function(path) {
  return util.uri.BASE_PATH + util.uri.adjust_(path);
};


/**
 * @param {string} path .
 * @return {string} .
 */
util.uri.api = function(path) {
  path = 'api' + util.uri.adjust_(path);
  return util.uri.BASE_PATH + util.uri.adjust_(path);
};


/**
 * @param {string} path .
 * @return {string} .
 */
util.uri.page.project = function(path) {
  path = util.data.get('current_project').access_token +
         util.uri.adjust_(path);
  return util.uri.BASE_PATH + util.uri.adjust_(path);
};


/**
 * @param {string} path .
 * @return {string} .
 */
util.uri.api.project = function(path) {
  path = util.string.makeSafe(path);
  if (!util.string.isEmpty(path)) {
    path =  util.uri.adjust_(path);
  }
  path = 'api/' + util.data.get('current_project').access_token + path;
  return util.uri.BASE_PATH + util.uri.adjust_(path);
};


/**
 * @param {string} path .
 * @return {string} .
 */
util.uri.css = function(path) {
  return util.uri.staticPath(path, 'stylesheets');
};


/**
 * @param {string} path .
 * @return {string} .
 */
util.uri.js = function(path) {
  return util.uri.staticPath(path, 'javascripts');
};


/**
 * @param {string} path .
 * @return {string} .
 */
util.uri.image = function(path) {
  return util.uri.staticPath(path, 'images');
};


/**
 * @param {string} folder .
 * @param {string} path .
 * @return {string} .
 */
util.uri.staticPath = function(path, opt_folder) {
  return [
    util.uri.BASE_PATH,
    '/',
    util.uri.STATIC_PATH,
    opt_folder ? '/' + opt_folder : '',
    util.uri.adjust_(path)
  ].join('');
};


/**
 * @param {string} path .
 * @return {string} .
 * @private
 */
util.uri.adjust_ = function(path) {
  if (!util.string.startsWith(path, '/')) {
    path = '/' + path;
  }
  return path;
};


/**
 * @type {RegExp}
 * @private
 */
util.uri.regexp_ = new RegExp('^(?:(https?:)//(([^:/]+)(:[^/]+)?))?([^#?]*)(\\?[^#]*)?(#.*)?$');


/**
 * @param {string} str .
 * @return {util.uri.Location} .
 */
util.uri.parse = function(str) {
  var matched = str.match(util.uri.regexp_);
  var ret = new util.uri.Location();
  ret.init.apply(ret, matched.slice(1));
  return ret;
};


/**
 * @constructor
 */
util.uri.Location = function() {
  this.init.apply(this, arguments);
};


/**
 * @param {string} protocol .
 * @param {string} host .
 * @param {string} hostname .
 * @param {number|string} port .
 * @param {string} pathname .
 * @param {string} search .
 * @param {string} hash .
 */
util.uri.Location.prototype.init =
    function(protocol, host, hostname, port, pathname, search, hash) {
  this.protocol = protocol;
  this.host = host;
  this.hostname = hostname;
  this.port = port || '';
  this.pathname = pathname || '';
  this.search = search || '';
  this.hash = hash || '';

  if (protocol) {
    this.href = this.protocol + '//' + this.host + this.pathname + this.search + this.hash;
  } else {
    if (host) {
      this.href = '//' + this.host + this.pathname + this.search + this.hash;
    } else {
      this.href = this.pathname + this.search + this.hash;
    }
  }
};


/**
 * @param {string} name .
 * @return {?string} .
 */
util.uri.Location.prototype.params = function(name) {
  if (!this._params) {
    var params = {};

    var pairs = this.search.substring(1).split(/[;&]/);
    for (var i = 0, len = pairs.length; i < len; i++) {
      var pair = pairs[i].split(/=/);
      var key  = decodeURIComponent(pair[0]);
      var val  = decodeURIComponent(pair[1]);
      if (key) {
        if (!params[key]) {
          params[key] = [];
        }
        params[key].push(val);
      }
    }

    this._params = params;
  }

  switch (typeof name) {
    case 'undefined':
      return this._params;
    case 'object':
      return this.build(name);
  }
  return this._params[name] ? this._params[name][0] : null;
};


/**
 * @param {Object} params .
 * @return {util.uri.Location} .
 */
util.uri.Location.prototype.build = function(params) {
  if (!this._params) {
    this.params();
  }
  params = _.extend(this._params, params ? params : {});
  console.log(params);

  var ret = new util.uri.Location();
  var _search = this.search;
  if (params) {
    var search = [];
    for (var key in params) if (params.hasOwnProperty(key)) {
      var val = params[key];
      if (val != null) {
        switch (typeof val) {
          case 'object':
            for (var i = 0, len = val.length; i < len; i++) {
              search.push(encodeURIComponent(key) + '=' + encodeURIComponent(val[i]));
            }
            break;
          default:
            search.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
        }
      }
    }
    _search = '?' + search.join('&');
  }

  ret.init.apply(ret, [
    this.protocol,
    this.host,
    this.hostname,
    this.port,
    this.pathname,
    _search,
    this.hash
  ]);
  return ret;
};
