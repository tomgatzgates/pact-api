function pactMethod({method, path}) {
  return function(payload) {
    return this._request(method, path, payload);
  }
}
