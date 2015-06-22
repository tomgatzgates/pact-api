'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

require('es6-promise').polyfill();

var PactAPI = (function () {
  function PactAPI(_ref) {
    var base = _ref.base;
    var token = _ref.token;

    _classCallCheck(this, PactAPI);

    this.token = token;
    this.endpoints = {
      USERS: '' + base + '/users',
      LOGIN: '' + base + '/auth/login',
      LOGOUT: '' + base + '/auth/logout'
    };
  }

  _createClass(PactAPI, [{
    key: '_get',
    value: function _get(url, callback) {
      _superagent2['default'].get(url).end(callback);
    }
  }, {
    key: '_post',
    value: function _post(url, payload, callback) {
      _superagent2['default'].post(url).type('form').send(payload).end(callback);
    }
  }, {
    key: '_put',
    value: function _put(url, payload, callback) {
      _superagent2['default'].put(url).send(payload).end(callback);
    }
  }, {
    key: '_del',
    value: function _del(url, callback) {
      _superagent2['default'].del(url).end(callback);
    }
  }, {
    key: 'login',
    value: function login(_login, password) {
      var endpoints = this.endpoints;
      var _post = this._post;

      return new _Promise(function (resolve, reject) {
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
    value: function logout() {
      return new _Promise(function (resolve, reject) {
        setTimeout(resolve, 500);
      });
    }
  }, {
    key: 'getOrders',
    value: function getOrders(userId) {
      var endpoints = this.endpoints;
      var _get = this._get;

      return new _Promise(function (resolve, reject) {
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

