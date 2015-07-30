'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var HTTPRequestable = (function () {
  function HTTPRequestable() {
    _classCallCheck(this, HTTPRequestable);
  }

  // Private API: convenience request methods

  HTTPRequestable.prototype._get = function _get(url, callback) {
    var req = _superagent2['default'].get(url);
    if (this.accessToken) {
      req.set('Authorization', this.accessToken);
    }
    req.end(callback);
  };

  HTTPRequestable.prototype._post = function _post(url, payload, callback) {
    var req = _superagent2['default'].post(url);
    if (this.accessToken) {
      req.set('Authorization', this.accessToken);
    }
    req.type('form').send(payload).end(callback);
  };

  HTTPRequestable.prototype._put = function _put(url, payload, callback) {
    var req = _superagent2['default'].put(url);
    if (this.accessToken) {
      req.set('Authorization', this.accessToken);
    }
    req.send(payload).end(callback);
  };

  HTTPRequestable.prototype._del = function _del(url, callback) {
    var req = _superagent2['default'].del(url);
    if (this.accessToken) {
      req.set('Authorization', this.accessToken);
    }
    req.end(callback);
  };

  return HTTPRequestable;
})();

exports['default'] = HTTPRequestable;
module.exports = exports['default'];