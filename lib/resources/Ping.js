'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _PactResource2 = require('../PactResource');

var _PactResource3 = _interopRequireDefault(_PactResource2);

var Ping = (function (_PactResource) {
  _inherits(Ping, _PactResource);

  function Ping(pactAPI) {
    _classCallCheck(this, Ping);

    var path = '/ping';
    var includeBasic = ['list'];
    _PactResource.call(this, { pactAPI: pactAPI, path: path, includeBasic: includeBasic });
  }

  return Ping;
})(_PactResource3['default']);

exports['default'] = Ping;
module.exports = exports['default'];