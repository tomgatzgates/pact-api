import Login from './resources/Login';
import Logout from './resources/Logout';

const resources = {
  Token
}

class PactAPI {
  constructor(key, base) {

    this._api = {
      base,
      key,
    }
    this._prepResources()
  }
  getApiField(key) {
    return this._api[key];
  }
  setApiKey(key) {
    if (key) {
      this._api.key = key;
      this._prepResources();
    }
  }
  setApiBase(base) {
    this._api.base = base;
    this._prepResources();
  }
  _prepResources() {
    for (var name in resources) {
      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new resources[name](this);
    }
  }
}

// const api = new PactAPI('testKey', 'testBase');
// api.token.create()
// api.token.del()
