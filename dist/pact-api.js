'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

exports.setAccessToken = setAccessToken;
exports.login = login;
exports.logout = logout;
exports.getOrders = getOrders;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

require('es6-promise').polyfill();

var TOKEN = undefined;

var BASE = 'https://pact-api-proxy.herokuapp.com/v1';
var endpoints = {
  USERS: '' + BASE + '/users',
  LOGIN: '' + BASE + '/auth/login'
};

function _get(url, callback) {
  _superagent2['default'].get(url).end(callback);
}

function _authedGet(url, callback) {
  _superagent2['default'].get(url).set('Authorization', TOKEN).end(callback);
}

function _post(url, payload, callback) {
  _superagent2['default'].post(url).type('form').send(payload).end(callback);
}

function _put(url, payload, callback) {
  _superagent2['default'].put(url).send(payload).end(callback);
}

function _del(url, callback) {
  _superagent2['default'].del(url).end(callback);
}

function setAccessToken(token) {
  TOKEN = token;
}

function login(login, password) {
  return new _Promise(function (resolve, reject) {
    _post(endpoints.LOGIN, {
      login: login,
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

function logout() {
  return new _Promise(function (resolve, reject) {
    setTimeout(resolve, 500);
  });
}

function getOrders(userId) {
  return new _Promise(function (resolve, reject) {
    _authedGet('' + endpoints.USERS + '/' + userId + '/orders', function (err, res) {
      if (err) {
        reject(err);
        return;
      }
      resolve(res.body);
    });
  });
}

