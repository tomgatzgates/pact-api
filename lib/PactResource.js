'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _pactMethod = require('./pactMethod');

var _pactMethod2 = _interopRequireDefault(_pactMethod);

var basicMethods = {
  create: _pactMethod2['default']({
    method: 'post'
  }),
  'delete': _pactMethod2['default']({
    method: 'del'
  })
};

var PactResource = (function () {
  function PactResource(_ref) {
    var _this = this;

    var pactAPI = _ref.pactAPI;
    var path = _ref.path;
    var includeBasic = _ref.includeBasic;
    var methods = _ref.methods;

    _classCallCheck(this, PactResource);

    this._pactAPI = pactAPI;
    this.path = path;

    // Resource path is different to method path

    _Object$keys(methods).forEach(function (k) {
      _this[k] = methods[k];
    });

    if (includeBasic) {
      includeBasic.forEach(function (method) {
        _this[method] = basicMethods[method];
      }, this);
    }
  }

  PactResource.prototype._request = function _request(method, path, payload) {
    var base = this._pactAPI.getAPIField('base');
    var token = this._pactAPI.getAPIField('token');
    var url = base + path;

    return new _Promise(function (resolve, reject) {
      var req = _superagent2['default'][method](url);
      if (payload) {
        req.send(payload);
      }
      if (token) {
        req.auth(token, '');
      }
      req.end(function (err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });

    // TODO: check methods exist on superagent
  };

  return PactResource;
})();

exports['default'] = PactResource;
module.exports = exports['default'];