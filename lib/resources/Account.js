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

var Account = (function (_PactResource) {
  _inherits(Account, _PactResource);

  function Account(pactAPI) {
    _classCallCheck(this, Account);

    var path = '/users/me/account';

    var methods = {
      fetch: _pactMethod2['default']({
        method: methods.GET
      })
    };

    _PactResource.call(this, { pactAPI: pactAPI, path: path, methods: methods });
  }

  return Account;
})(_PactResource3['default']);

exports['default'] = Account;
module.exports = exports['default'];