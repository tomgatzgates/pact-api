'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _PactResource2 = require('../PactResource');

var _PactResource3 = _interopRequireDefault(_PactResource2);

var Recurrables = (function (_PactResource) {
  _inherits(Recurrables, _PactResource);

  function Recurrables(pactAPI) {
    _classCallCheck(this, Recurrables);

    var path = '/users/me/recurrables';
    var includeBasic = ['list', 'retrieve', 'create', 'update', 'del'];
    _PactResource.call(this, { pactAPI: pactAPI, path: path, includeBasic: includeBasic });
  }

  return Recurrables;
})(_PactResource3['default']);

exports['default'] = Recurrables;
module.exports = exports['default'];