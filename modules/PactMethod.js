// This fn to be used from inside a PactResource class/subclass
export default function pactMethod({method = 'get', path = ''}) {
  // TODO: urlParam munging

  return function makeRequest(payload) {
    return this._request(method, path, payload);
  };
}
