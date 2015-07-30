/*eslint key-spacing: 0 camelcase: 0*/

'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _HTTPRequestable2 = require('./HTTPRequestable');

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

var _HTTPRequestable3 = _interopRequireDefault(_HTTPRequestable2);

var PactAPI = (function (_HTTPRequestable) {
  _inherits(PactAPI, _HTTPRequestable);

  function PactAPI(_ref) {
    var base = _ref.base;

    _classCallCheck(this, PactAPI);

    _HTTPRequestable.call(this);
    this.base = base;
    this.accessToken = null;
    this._getEndpoints = this._getEndpoints.bind(this);
  }

  PactAPI.prototype._getEndpoints = function _getEndpoints() {
    return {
      USERS: this.base + '/users',
      PRODUCTS: this.base + '/products',
      LOGIN: this.base + '/auth/login',
      LOGOUT: this.base + '/auth/logout'
    };
  };

  /*
   * Set the `access_token` to be used on all requests.
   *
   * An `access_token` will be in the response to a successful `login`. If you
   * wish to perform auth-requiring requests, you need to manually set the
   * access token with this method.
   */

  PactAPI.prototype.setAccessToken = function setAccessToken(token) {
    _invariant2['default'](token, 'PactAPI.setAccessToken(...): You must supply a valid token');
    this.accessToken = token;
  };

  /*
   * Set the base URL to be used by the instance.
   */

  PactAPI.prototype.setBase = function setBase(base) {
    _invariant2['default'](base, 'PactAPI.setBase(...): You must supply a base');
    this.base = base;
  };

  /* Log a user in */

  PactAPI.prototype.login = function login(_login, password) {
    _invariant2['default'](_login && password, 'PactAPI.login(...): You must supply a valid login and password.\n      You passed "' + _login + '" and "' + password + '".');

    var _getEndpoints = this._getEndpoints;

    var _post = this._post.bind(this);
    return new _Promise(function (resolve, reject) {
      _post(_getEndpoints().LOGIN, {
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
  };

  /* Log a user out */

  PactAPI.prototype.logout = function logout(access_code) {
    _invariant2['default'](access_code, 'PactAPI.logout(...): You must supply a valid access code.\n      You passed "' + access_code + '".');

    var _getEndpoints = this._getEndpoints;

    var _post = this._post.bind(this);
    return new _Promise(function (resolve, reject) {
      _post(_getEndpoints().LOGOUT, { access_code: access_code }, function (err, res) {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.body);
      });
    });
  };

  /* Get all the orders for a user */

  PactAPI.prototype.getOrders = function getOrders(userId) {
    _invariant2['default'](userId, 'PactAPI.getOrders(...): You must supply a valid user ID.\n      You passed "' + userId + '".');

    var _getEndpoints = this._getEndpoints;

    var _get = this._get.bind(this);
    return new _Promise(function (resolve, reject) {
      _get(_getEndpoints().USERS + '/' + userId + '/orders', function (err, res) {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.body);
      });
    });
  };

  /*
   * Update the dispatch date for an order.
   * `yearMonthDayString` is in the format of `YYYY-MM-DD`.
   */

  PactAPI.prototype.updateOrderDispatchDate = function updateOrderDispatchDate(_ref2) {
    var userId = _ref2.userId;
    var orderId = _ref2.orderId;
    var yearMonthDayString = _ref2.yearMonthDayString;

    _invariant2['default'](userId && orderId && yearMonthDayString, 'PactAPI.getOrders(...): You must supply valid arguments.\n      You passed "' + userId + '", "' + orderId + '", and "' + yearMonthDayString + '".');
    _invariant2['default'](yearMonthDayString.split('-').length === 3, 'PactAPI.updateOrderDispatchDate(...): You must supply a valid yearMonthDayString with the signature YYYY-MM-DD.');

    var _getEndpoints = this._getEndpoints;

    var _put = this._put.bind(this);
    return new _Promise(function (resolve, reject) {
      _put(_getEndpoints().USERS + '/' + userId + '/orders/' + orderId, {
        'order[dispatch_date]': yearMonthDayString
      }, function (err, res) {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.body);
      });
    });
  };

  /*
   * Update the preparation (grind) or coffee ID for an order.
   */

  PactAPI.prototype.updateOrderCoffee = function updateOrderCoffee(_ref3) {
    var userId = _ref3.userId;
    var orderId = _ref3.orderId;
    var itemId = _ref3.itemId;
    var productId = _ref3.productId;
    var coffeeId = _ref3.coffeeId;
    var preparation = _ref3.preparation;
    var _getEndpoints = this._getEndpoints;

    var _getEndpoints2 = _getEndpoints();

    var USERS = _getEndpoints2.USERS;

    var _put = this._put.bind(this);
    return new _Promise(function (resolve, reject) {
      _put(USERS + '/' + userId + '/orders/' + orderId + '/items/' + itemId, {
        'item[product_attributes][id]': productId,
        'item[product_attributes][options][preparation]': preparation,
        'item[product_attributes][options][coffee_type_id]': coffeeId
      }, function (err, res) {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.body);
      });
    });
  };

  /* Fetch all the products */

  PactAPI.prototype.getProducts = function getProducts() {
    var _getEndpoints = this._getEndpoints;

    var _get = this._get.bind(this);
    return new _Promise(function (resolve, reject) {
      _get(_getEndpoints().PRODUCTS, function (err, res) {
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