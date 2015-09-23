'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _PactResource2 = require('../PactResource');

var _PactResource3 = _interopRequireDefault(_PactResource2);

var _pactMethod = require('../pactMethod');

var _pactMethod2 = _interopRequireDefault(_pactMethod);

var _methods = require('../methods');

var _methods2 = _interopRequireDefault(_methods);

var Addresses = (function (_PactResource) {
  _inherits(Addresses, _PactResource);

  function Addresses(pactAPI) {
    _classCallCheck(this, Addresses);

    var path = '/users/me/addresses';
    var includeBasic = ['list', 'retrieve', 'create', 'update', 'del'];
    _PactResource.call(this, { pactAPI: pactAPI, path: path, includeBasic: includeBasic, methods: _methods2['default'] });
  }

  return Addresses;
})(_PactResource3['default']);

exports['default'] = Addresses;
module.exports = exports['default'];