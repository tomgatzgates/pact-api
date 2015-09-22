import Token from './resources/Token';

const resources = {
  Token,
};

export default class PactAPI {
  constructor(key, version = PactAPI.DEFAULT_VERSION, base = PactAPI.DEFAULT_BASE) {
    this._api = {
      version,
      base,
      key,
    };
    this._prepResources();
  }
  getAPIField(k) {
    return this._api[k];
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
    Object.keys(resources).forEach(name => {
      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new resources[name](this);
    });
  }
}

PactAPI.DEFAULT_HOST = 'https://api.pactcoffee.com';
PactAPI.DEFAULT_VERSION = 'v1';

// const api = new PactAPI('testKey', 'v1', 'testBase');
// api.token.create()
// api.token.del()

// Method constants to map between HTTP and superagent
