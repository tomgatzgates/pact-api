/*eslint key-spacing: 0 camelcase: 0*/

import request from 'superagent';
require('es6-promise').polyfill();

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
export default class PactAPI {
  constructor({base}) {
    this.base = base;
    this.accessToken = null;
    this._getEndpoints = this._getEndpoints.bind(this);
  }

  _getEndpoints() {
    return {
      USERS:  `${this.base}/users`,
      LOGIN:  `${this.base}/auth/login`,
      LOGOUT: `${this.base}/auth/logout`
    };
  }

  // Private API
  _get(url, callback) {
    const req = request.get(url);
    if (this.accessToken) {
      req.set('Authorization', this.accessToken);
    }
    req.end(callback);
  }
  _post(url, payload, callback) {
    const req = request.post(url);
    if (this.accessToken) {
      req.set('Authorization', this.accessToken);
    }
    req.type('form')
      .send(payload)
      .end(callback);
  }
  _put(url, payload, callback) {
    const req = request.put(url);
    if (this.accessToken) {
      req.set('Authorization', this.accessToken);
    }
    req.send(payload)
      .end(callback);
  }
  _del(url, callback) {
    const req = request.del(url);
    if (this.accessToken) {
      req.set('Authorization', this.accessToken);
    }
    req.end(callback);
  }

  /*
   * An `access_token` will be in the response to a successful `login`. If you
   * wish to perform auth-requiring requests, you need to manually set the
   * access token with this method.
   */
  setAccessToken(token) {
    this.accessToken = token;
  }
  setBase(base) {
    this.base = base;
  }

  login(login, password) {
    const {_getEndpoints} = this;
    const _post = this._post.bind(this);
    return new Promise((resolve, reject) => {
      _post(_getEndpoints().LOGIN, {
        login,
        password
      }, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({
          ...res.body,
          user_id: `${res.body.user_id}` // kinda hacky but we need a string
        });
      });
    });
  }

  logout(access_code) {
    const {_getEndpoints} = this;
    const _post = this._post.bind(this);
    return new Promise((resolve, reject) => {
      _post(_getEndpoints().LOGOUT, {access_code}, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.body);
      });
    });
  }

  getOrders(userId) {
    const {_getEndpoints} = this;
    const _get = this._get.bind(this);
    return new Promise((resolve, reject) => {
      _get(`${_getEndpoints().USERS}/${userId}/orders`, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.body);
      });
    });
  }
}
