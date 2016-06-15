import PasswordReset from './resources/PasswordReset';
import Recurrables from './resources/Recurrables';
import OrderItems from './resources/OrderItems';
import Identities from './resources/Identities';
import Addresses from './resources/Addresses';
import Vouchers from './resources/Vouchers';
import Products from './resources/Products';
import Validate from './resources/Validate';
import Orders from './resources/Orders';
import Token from './resources/Token';
import Users from './resources/Users';
import Gifts from './resources/Gifts';
import Ping from './resources/Ping';
import Commands from './resources/Commands';

const resources = {
  PasswordReset,
  Recurrables,
  OrderItems,
  Identities,
  Addresses,
  Vouchers,
  Products,
  Validate,
  Orders,
  Token,
  Users,
  Gifts,
  Ping,
  Commands,
};

/**
 * This creates an object with the resources as methods along with a reference to
 * the current Viper API (base, token, version). Each resource defines its own endpoint,
 * method and payload details which match Viper API.
 */
export default class PactAPI {
  constructor(token, version = PactAPI.DEFAULT_VERSION, base = PactAPI.DEFAULT_BASE) {
    this._api = {
      version,
      token,
      base,
    };
    this._prepResources();
  }
  /**
   * Get a key from the API
   * @param  {string} k API field
   * @return {string} required API field
   */
  getAPIField(k) {
    return this._api[k];
  }
  /**
   * Set API version
   * @param {string} version API version
   */
  setAPIVersion(version) {
    if (version) {
      this._api.version = version;
      this._prepResources();
    }
  }
  /**
   * @param {string} token Authentication token
   */
  setAPIToken(token) {
    this._api.token = token;
    this._prepResources();
  }
  /**
   * @param {string} base Base url
   */
  setAPIBase(base) {
    if (base) {
      this._api.base = base;
      this._prepResources();
    }
  }
  /**
   * Allows you to set a custom error handler
   * @param {Function} callback Custom error callback
   */
  setErrorHandler(callback) {
    if (callback && typeof callback === 'function') {
      this._api.errorHandler = callback;
    }
  }
  /**
   * @param {number} ms Milliseconds for timeout value
   */
  setRequestTimeout(ms) {
    this._api.timeout = ms;
  }
  /**
   * Loops through and instantiates resources and sticks them on object
   */
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
