"use strict";

function pactMethod(_ref) {
  var method = _ref.method;
  var path = _ref.path;

  return function (payload) {
    return this._request(method, path, payload);
  };
}