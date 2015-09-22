'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var Token = (function (_PactResource) {
  _inherits(Token, _PactResource);

  function Token(pactAPI) {
    _classCallCheck(this, Token);

    var path = '/tokens';
    var includeBasic = ['create'];

    var methods = {
      del: pactMethod({
        method: 'del',
        path: '/tokens/me'
      })
    };

    _PactResource.call(this, { pactAPI: pactAPI, methods: methods, path: path, includeBasic: includeBasic });
  }

  return Token;
})(PactResource);