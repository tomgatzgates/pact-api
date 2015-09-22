'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _resourcesToken = require('./resources/Token');

var _resourcesToken2 = _interopRequireDefault(_resourcesToken);

var resources = {
  Token: _resourcesToken2['default']
};

var PactAPI = (function () {
  function PactAPI(token) {
    var version = arguments.length <= 1 || arguments[1] === undefined ? PactAPI.DEFAULT_VERSION : arguments[1];
    var base = arguments.length <= 2 || arguments[2] === undefined ? PactAPI.DEFAULT_BASE : arguments[2];

    _classCallCheck(this, PactAPI);

    this._api = {
      version: version,
      token: token,
      base: base
    };
    this._prepResources();
  }

  PactAPI.prototype.getAPIField = function getAPIField(k) {
    return this._api[k];
  };

  PactAPI.prototype.setAPIVersion = function setAPIVersion(version) {
    if (version) {
      this._api.version = version;
      this._prepResources();
    }
  };

  PactAPI.prototype.setAPIToken = function setAPIToken(token) {
    if (token) {
      this._api.token = token;
      this._prepResources();
    }
  };

  PactAPI.prototype.setAPIBase = function setAPIBase(base) {
    if (base) {
      this._api.base = base;
      this._prepResources();
    }
  };

  PactAPI.prototype._prepResources = function _prepResources() {
    var _this = this;

    _Object$keys(resources).forEach(function (name) {
      _this[name[0].toLowerCase() + name.substring(1)] = new resources[name](_this);
    });
  };

  return PactAPI;
})();

exports['default'] = PactAPI;

PactAPI.DEFAULT_HOST = 'https://api.pactcoffee.com';
PactAPI.DEFAULT_VERSION = 'v1';

// const api = new PactAPI('testKey', 'v1', 'testBase');
// api.token.create()
// api.token.del()

// Method constants to map between HTTP and superagent
module.exports = exports['default'];