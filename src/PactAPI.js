import request from 'superagent';

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
    this.endpoints = {
      USERS:  `${base}/users`,
      LOGIN:  `${base}/auth/login`,
      LOGOUT: `${base}/auth/logout`
    };
    this.accessToken = null;
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
    const req = request.del(url)
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

  login(login, password) {
    const {endpoints, _post} = this;
    return new Promise((resolve, reject) => {
      _post(endpoints.LOGIN, {
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
    const {endpoints, _post} = this;
    return new Promise((resolve, reject) => {
      _post(endpoints.LOGOUT, {access_code}, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.body);
      });
    });
  }

  getOrders(userId) {
    const {endpoints, _get} = this;
    return new Promise((resolve, reject) => {
      _get(`${endpoints.USERS}/${userId}/orders`, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.body);
      });
    });
  }
}
