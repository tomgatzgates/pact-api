'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _PactResource2 = require('../PactResource');

var _PactResource3 = _interopRequireDefault(_PactResource2);

var _pactMethod = require('../pactMethod');

var _pactMethod2 = _interopRequireDefault(_pactMethod);

var _methodTypes = require('../methodTypes');

var _methodTypes2 = _interopRequireDefault(_methodTypes);

var Products = (function (_PactResource) {
  _inherits(Products, _PactResource);

  function Products(pactAPI) {
    _classCallCheck(this, Products);

    var path = '/products';
    var includeBasic = ['list'];
    var methods = {
      retrieve: _pactMethod2['default']({
        method: _methodTypes2['default'].GET,
        urlParams: ['sku'],
        path: '{sku}'
      })
    };
    _PactResource.call(this, { pactAPI: pactAPI, path: path, includeBasic: includeBasic, methods: methods });
  }

  return Products;
})(_PactResource3['default']);

exports['default'] = Products;
module.exports = exports['default'];