'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _PactResource2 = require('../PactResource');

var _PactResource3 = _interopRequireDefault(_PactResource2);

var Token = (function (_PactResource) {
  _inherits(Token, _PactResource);

  function Token(_ref) {
    var key = _ref.key;
    var base = _ref.base;

    _classCallCheck(this, Token);

    _PactResource.call(this, {
      key: key,
      base: base,
      path: '/tokens',
      includeBasic: ['get', 'del']
    });
  }

  return Token;
})(_PactResource3['default']);