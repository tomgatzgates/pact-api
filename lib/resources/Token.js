'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _PactResource2 = require('../PactResource');

var _PactResource3 = _interopRequireDefault(_PactResource2);

var _pactMethod = require('../pactMethod');

var _pactMethod2 = _interopRequireDefault(_pactMethod);

var Token = (function (_PactResource) {
  _inherits(Token, _PactResource);

  function Token(pactAPI) {
    _classCallCheck(this, Token);

    var path = '/tokens';

    var includeBasic = ['create'];

    var methods = {
      del: _pactMethod2['default']({
        method: 'del',
        path: '/me'
      })
    };

    _PactResource.call(this, { pactAPI: pactAPI, path: path, methods: methods, includeBasic: includeBasic });
  }

  return Token;
})(_PactResource3['default']);

exports['default'] = Token;
module.exports = exports['default'];