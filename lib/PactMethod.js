// This fn to be used from inside a PactResource class/subclass
'use strict';

exports.__esModule = true;
exports['default'] = pactMethod;

function pactMethod(_ref) {
  var _ref$method = _ref.method;
  var method = _ref$method === undefined ? 'get' : _ref$method;
  var _ref$path = _ref.path;
  var path = _ref$path === undefined ? '' : _ref$path;

  // TODO: urlParam munging

  return function makeRequest(payload) {
    var resourcePath = this.path;
    var fullPath = resourcePath + path;
    return this._request(method, fullPath, payload);
  };
}

module.exports = exports['default'];