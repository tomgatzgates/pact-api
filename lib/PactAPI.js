'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _resourcesLogin = require('./resources/Login');

var _resourcesLogin2 = _interopRequireDefault(_resourcesLogin);

var _resourcesLogout = require('./resources/Logout');

var _resourcesLogout2 = _interopRequireDefault(_resourcesLogout);

var resources = {
  Token: Token
};

var PactAPI = (function () {
  function PactAPI(key, version, base) {
    _classCallCheck(this, PactAPI);

    this._api = {
      version: version,
      base: base,
      key: key
    };
    this._prepResources();
  }

  // const api = new PactAPI('testKey', 'v1', 'testBase');
  // api.token.create()
  // api.token.del()

  // Method constants to map between HTTP and superagent

  PactAPI.prototype.getAPIField = function getAPIField(key) {
    return this._api[key];
  };

  PactAPI.prototype.setAPIVersion = function setAPIVersion(version) {
    if (version) {
      this._api.version = version;
      this._prepResources();
    }
  };

  PactAPI.prototype.setAPIKey = function setAPIKey(key) {
    if (key) {
      this._api.key = key;
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
    for (var name in resources) {
      this[name[0].toLowerCase() + name.substring(1)] = new resources[name](this);
    }
  };

  return PactAPI;
})();

exports.PactAPI = PactAPI;