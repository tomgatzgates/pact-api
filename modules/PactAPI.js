/*eslint key-spacing: 0 camelcase: 0*/

import invariant from 'invariant';
import HTTPRequestable from './HTTPRequestable';

/*
 * Example usage:
 *
 * ```js
 *  var api = new PactAPI('my api basepath');
 *  api.login(email, password).then(function(response){
 *    // Login was succesful!
 *  });
 * ```
 */
export default class PactAPI extends HTTPRequestable {
  constructor(base, token) {
    super(token);
    this.base = base;
    this._getEndpoints = this._getEndpoints.bind(this);
  }

  _getEndpoints() {
    return {
      LOGIN:  `${this.base}/tokens/`,
      LOGOUT: `${this.base}/tokens/me`
    };
  }

  /*
   * Set the base URL to be used by the instance.
   */
  setBase(base) {
    invariant(base, `PactAPI.setBase(...): You must supply a base`);
    this.base = base;
  }

  login(email, password) {
    invariant(
      email && password,
      `PactAPI.login(...): You must supply an email and password.
      You passed "${email}" and "${password}".`
    );

    const {_getEndpoints} = this;
    const _post = this._post.bind(this);
    const setToken = this.setToken.bind(this);

    return new Promise((resolve, reject) => {
      _post(_getEndpoints().LOGIN, {
        email,
        password
      }, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        const {token} = res.body;
        setToken(token);
        resolve({
          token
        });
      });
    });
  }

  logout() {
    invariant(
      this.token,
      `PactAPI.logout(...): Auth token required to logout. Make sure to pass a valid token when creating a new PactAPI instance, or `
    );

    const {_getEndpoints} = this;
    const _del = this._del.bind(this);

    return new Promise((resolve, reject) => {
      _del(
        _getEndpoints().LOGOUT,
        (err, res) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(res.body);
        }
      );
    });
  }
}

