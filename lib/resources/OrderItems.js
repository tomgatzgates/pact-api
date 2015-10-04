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

var OrderItems = (function (_PactResource) {
  _inherits(OrderItems, _PactResource);

  function OrderItems(pactAPI) {
    _classCallCheck(this, OrderItems);

    var path = '/users/me/orders';
    var methods = {
      list: _pactMethod2['default']({
        method: _methodTypes2['default'].GET,
        urlParams: ['orderId'],
        path: '{orderId}/items'
      }),
      // Retrieve a specific record from the API
      retrieve: _pactMethod2['default']({
        method: _methodTypes2['default'].GET,
        urlParams: ['orderId', 'id'],
        path: '{orderId}/items/{id}'
      }),
      // Create a record
      create: _pactMethod2['default']({
        method: _methodTypes2['default'].POST,
        urlParams: ['orderId'],
        path: '{orderId}/items'
      }),
      // Update an existing record
      update: _pactMethod2['default']({
        method: _methodTypes2['default'].PATCH,
        urlParams: ['orderId', 'id'],
        path: '{orderId}/items/{id}'
      }),
      // Delete a record
      del: _pactMethod2['default']({
        method: _methodTypes2['default'].DELETE,
        urlParams: ['orderId', 'id'],
        path: '{orderId}/items/{id}'
      })
    };

    _PactResource.call(this, { pactAPI: pactAPI, path: path, methods: methods });
  }

  return OrderItems;
})(_PactResource3['default']);

exports['default'] = OrderItems;
module.exports = exports['default'];