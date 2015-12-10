import PasswordReset from './resources/PasswordReset';
import Recurrables from './resources/Recurrables';
import OrderItems from './resources/OrderItems';
import Identities from './resources/Identities';
import Addresses from './resources/Addresses';
import Vouchers from './resources/Vouchers';
import Products from './resources/Products';
import Validate from './resources/Validate';
import Bundles from './resources/Bundles';
import Orders from './resources/Orders';
import Token from './resources/Token';
import Users from './resources/Users';
import Ping from './resources/Ping';

const resources = {
  PasswordReset,
  Recurrables,
  OrderItems,
  Identities,
  Addresses,
  Vouchers,
  Products,
  Validate,
  Bundles,
  Orders,
  Token,
  Users,
  Ping,
};

export default class PactAPI {
  constructor(token, version = PactAPI.DEFAULT_VERSION, base = PactAPI.DEFAULT_BASE) {
    this._api = {
      version,
      token,
      base,
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
  setAPIToken(token) {
    this._api.token = token;
    this._prepResources();
  }
  setAPIBase(base) {
    if (base) {
      this._api.base = base;
      this._prepResources();
    }
  }
  setErrorHandler(callback) {
    if (callback && typeof callback === 'function') {
      this._api.errorHandler = callback;
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
