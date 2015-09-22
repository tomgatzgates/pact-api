'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var basicMethods = {
  create: pactMethod({
    method: 'post'
  }),
  'delete': pactMethod({
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
    if (method === undefined) method = 'get';
    if (path === undefined) path = '';

    var base = this._pactAPI.getAPIField('base');
    var key = this._pactAPI.getAPIField('key');
    var url = base + path;

    console.log('request.' + method + '(' + url + ')');
    if (payload) {
      console.log('request.send(' + payload + ')');
    }
    if (key) {
      console.log('key: ' + key);
    }
  };

  return PactResource;
})();