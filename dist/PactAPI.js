'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

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

var PactAPI = (function () {
  function PactAPI(_ref) {
    var base = _ref.base;

    _classCallCheck(this, PactAPI);

    this.endpoints = {
      USERS: '' + base + '/users',
      LOGIN: '' + base + '/auth/login',
      LOGOUT: '' + base + '/auth/logout'
    };
    this.accessToken = null;
  }

  _createClass(PactAPI, [{
    key: '_get',

    // Private API
    value: function _get(url, callback) {
      var req = _superagent2['default'].get(url);
      if (this.accessToken) {
        req.set('Authorization', this.accessToken);
      }
      req.end(callback);
    }
  }, {
    key: '_post',
    value: function _post(url, payload, callback) {
      var req = _superagent2['default'].post(url);
      if (this.accessToken) {
        req.set('Authorization', this.accessToken);
      }
      req.type('form').send(payload).end(callback);
    }
  }, {
    key: '_put',
    value: function _put(url, payload, callback) {
      var req = _superagent2['default'].put(url);
      if (this.accessToken) {
        req.set('Authorization', this.accessToken);
      }
      req.send(payload).end(callback);
    }
  }, {
    key: '_del',
    value: function _del(url, callback) {
      var req = _superagent2['default'].del(url);
      if (this.accessToken) {
        req.set('Authorization', this.accessToken);
      }
      req.end(callback);
    }
  }, {
    key: 'setAccessToken',

    /*
     * An `access_token` will be in the response to a successful `login`. If you
     * wish to perform auth-requiring requests, you need to manually set the
     * access token with this method.
     */
    value: function setAccessToken(token) {
      this.accessToken = token;
    }
  }, {
    key: 'login',
    value: function login(_login, password) {
      var endpoints = this.endpoints;
      var _post = this._post;

      return new Promise(function (resolve, reject) {
        _post(endpoints.LOGIN, {
          login: _login,
          password: password
        }, function (err, res) {
          if (err) {
            reject(err);
            return;
          }
          resolve(_extends({}, res.body, {
            user_id: '' + res.body.user_id // kinda hacky but we need a string
          }));
        });
      });
    }
  }, {
    key: 'logout',
    value: function logout(access_code) {
      var endpoints = this.endpoints;
      var _post = this._post;

      return new Promise(function (resolve, reject) {
        _post(endpoints.LOGOUT, { access_code: access_code }, function (err, res) {
          if (err) {
            reject(err);
            return;
          }
          resolve(res.body);
        });
      });
    }
  }, {
    key: 'getOrders',
    value: function getOrders(userId) {
      var endpoints = this.endpoints;
      var _get = this._get;

      return new Promise(function (resolve, reject) {
        _get('' + endpoints.USERS + '/' + userId + '/orders', function (err, res) {
          if (err) {
            reject(err);
            return;
          }
          resolve(res.body);
        });
      });
    }
  }]);

  return PactAPI;
})();

exports['default'] = PactAPI;
module.exports = exports['default'];

