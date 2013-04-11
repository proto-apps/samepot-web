/**
 * @fileoverview The wrapper of socket.io client.
 * @author yo_waka
 */

if (!util) {
  var util = {};
}


/**
 * @constructor
 */
util.SocketIO = function() {
  this.activityHandlers_ = [];
};


/**
 * @enum {string}
 */
util.SocketIO.EventType = {
  'CONNECTED': 'connected',
  'DISCONNECT': 'disconnect',
  'ERROR': 'error',
  'ENTER': 'enter',
  'ENTERED': 'entered',
  'LEAVE': 'leave',
  'LEFT': 'left',
  'ACTIVITY': 'activity'
};


/**
 * @type {util.SocketIO}
 * @private
 */
util.SocketIO.instance_;


/**
 * @return {util.SocketIO} .
 */
util.SocketIO.getInstance = function() {
  return util.SocketIO.instance_ || (util.SocketIO.instance_ = new util.SocketIO());
};


/**
 * @private
 */
util.SocketIO.prototype.socket_;


/**
 * @type {boolean}
 * @private
 */
util.SocketIO.prototype.running_ = false;


/**
 * @type {Array.<Function>}
 * @private
 */
util.SocketIO.prototype.activityHandlers_;


/**
 * @return {boolean} .
 */
util.SocketIO.prototype.isRunning = function() {
  return this.running_;
};


/**
 * @param {string=} opt_host .
 */
util.SocketIO.prototype.start = function(opt_host) {
  if (!window.io || this.isRunning()) {
    return;
  }

  // start connection
  var options = {
    'reconnect': true,
    'reconnection delay': 1000,
    'max reconnection attempts': 10
    //'sync disconnect on unload': true
  };
  this.socket_ = io.connect(opt_host || util.data.get('socketio_host'), options);

  // listen events
  var evtType = util.SocketIO.EventType;
  this.socket_.on(evtType.CONNECTED, _.bind(this.handleConnected_, this));
  this.socket_.on(evtType.DISCONNECTED, _.bind(this.handleDisconnected_, this));
  this.socket_.on(evtType.ERROR, _.bind(this.handleError_, this));
  this.socket_.on(evtType.ENTERED, _.bind(this.handleEntered_, this));
  this.socket_.on(evtType.LEFT, _.bind(this.handleLeft_, this));
  this.socket_.on(evtType.ACTIVITY, _.bind(this.handleActivity_, this));
 
  this.running_ = true;
};


/**
 * @private
 */
util.SocketIO.prototype.handleConnected_ = function() {
  $(window).bind('beforeunload', _.bind(this.leave, this));

  this.enter(
    util.data.get('current_project').access_token,
    util.data.get('current_user'));
};


/**
 */
util.SocketIO.prototype.disconnect = function() {
  this.socket_.emit(util.SocketIO.EventType.DISCONNECT);
};


/**
 * @private
 */
util.SocketIO.prototype.handleDisconnected_ = function() {
  this.running_ = false;
  this.socket_ = null;
};


/**
 * @param {Object} error .
 * @private
 */
util.SocketIO.prototype.handleError_ = function(error) {
  console.log(error);
};


/**
 * @param {string} project The access token.
 * @param {Object} user .
 */
util.SocketIO.prototype.enter = function(project, user) {
  this.socket_.emit(util.SocketIO.EventType.ENTER, {
    project: project,
    user: user
  });
};


/**
 * @private
 */
util.SocketIO.prototype.handleEntered_ = function() {
};


/**
 */
util.SocketIO.prototype.leave = function(evt) {
  this.socket_.emit(util.SocketIO.EventType.LEAVE);
  this.disconnect();
};


/**
 * @private
 */
util.SocketIO.prototype.handleLeft_ = function() {
};


/**
 * @param {Object} data .
 * @private
 */
util.SocketIO.prototype.handleActivity_ = function(data) {
  var json = $.parseJSON(data);
  _.each(this.activityHandlers_, function(handler) {
    handler(json);
  });
};


/**
 * @param {Function} fn .
 * @param {Object=} opt_scope .
 */
util.SocketIO.prototype.setActivityHandler = function(fn, opt_scope) {
  this.activityHandlers_.push(opt_scope ? _.bind(fn, opt_scope) : fn);
};
