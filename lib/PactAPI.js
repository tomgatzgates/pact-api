/*eslint key-spacing: 0 camelcase: 0*/

'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _HTTPRequestable2 = require('./HTTPRequestable');

var _HTTPRequestable3 = _interopRequireDefault(_HTTPRequestable2);

/*
 * Example usage:
 *
 * ```js
 *  var api = new PactAPI('my api basepath');
 *  api.login(email, password).then(function(response){
 *    // Login was succesful!
 *  });
 * ```
 */

var PactAPI = (function (_HTTPRequestable) {
  _inherits(PactAPI, _HTTPRequestable);

  function PactAPI(base, token) {
    _classCallCheck(this, PactAPI);

    _HTTPRequestable.call(this, token);
    this.base = base;
    this._getEndpoints = this._getEndpoints.bind(this);
  }

  PactAPI.prototype._getEndpoints = function _getEndpoints() {
    return {
      LOGIN: this.base + '/tokens/',
      LOGOUT: this.base + '/tokens/me'
    };
  };

  /*
   * Set the base URL to be used by the instance.
   */

  PactAPI.prototype.setBase = function setBase(base) {
    _invariant2['default'](base, 'PactAPI.setBase(...): You must supply a base');
    this.base = base;
  };

  PactAPI.prototype.login = function login(_login, password) {
    _invariant2['default'](_login && password, 'PactAPI.login(...): You must supply a login and password.\n      You passed "' + _login + '" and "' + password + '".');

    var _getEndpoints = this._getEndpoints;

    var _post = this._post.bind(this);
    var setToken = this.setToken.bind(this);

    return new _Promise(function (resolve, reject) {
      _post(_getEndpoints().LOGIN, {
        login: _login,
        password: password
      }, function (err, res) {
        if (err) {
          reject(err);
          return;
        }
        var token = res.body.token;

        setToken(token);
        resolve({
          token: token
        });
      });
    });
  };

  PactAPI.prototype.logout = function logout() {
    _invariant2['default'](this.token, 'PactAPI.logout(...): Auth token required to logout. Make sure to pass a valid token when creating a new PactAPI instance, or ');

    var _getEndpoints = this._getEndpoints;

    var _del = this._del.bind(this);

    return new _Promise(function (resolve, reject) {
      _del(_getEndpoints().LOGOUT, function (err, res) {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.body);
      });
    });
  };

  return PactAPI;
})(_HTTPRequestable3['default']);

exports['default'] = PactAPI;
module.exports = exports['default'];