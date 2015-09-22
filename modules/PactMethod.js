// This fn to be used from inside a PactResource class/subclass
export default function pactMethod({method = 'get', path = ''}) {
  // TODO: urlParam munging

  return function makeRequest(payload) {
    const resourcePath = this.path;
    const fullPath = resourcePath + path;
    return this._request(method, fullPath, payload);
  };
}
