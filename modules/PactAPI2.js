import Login from './resources/Login';
import Logout from './resources/Logout';

const resources = {
  Token
}

class PactAPI {
  constructor(key, version, base) {
    this._api = {
      version,
      base,
      key,
    };
    this._prepResources();
  }
  getAPIField(key) {
    return this._api[key];
  }
  setAPIVersion(version) {
    if (version) {
      this._api.version = version;
      this._prepResources();
    }
  }
  setAPIKey(key) {
    if (key) {
      this._api.key = key;
      this._prepResources();
    }
  }
  setAPIBase(base) {
    if (base) {
      this._api.base = base;
      this._prepResources();
    }
  }
  _prepResources() {
    for (var name in resources) {
      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new resources[name](this);
    }
  }
}

// const api = new PactAPI('testKey', 'v1', 'testBase');
// api.token.create()
// api.token.del()

// Method constants to map between HTTP and superagent
