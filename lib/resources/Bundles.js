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

var Bundles = (function (_PactResource) {
  _inherits(Bundles, _PactResource);

  function Bundles(pactAPI) {
    _classCallCheck(this, Bundles);

    var path = '/bundles';

    var methods = {
      list: _pactMethod2['default']({
        method: methods.GET
      }),
      retrieve: _pactMethod2['default']({
        method: methods.GET,
        urlParams: ['sku'],
        path: '{sku}'
      })
    };

    _PactResource.call(this, { pactAPI: pactAPI, path: path, methods: methods });
  }

  return Bundles;
})(_PactResource3['default']);

exports['default'] = Bundles;
module.exports = exports['default'];