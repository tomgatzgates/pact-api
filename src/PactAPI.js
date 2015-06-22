import request from 'superagent';
require('es6-promise').polyfill();

export default class PactAPI {
  constructor({base, token}) {
    this.token = token;
    this.endpoints = {
      USERS: `${base}/users`,
      LOGIN: `${base}/auth/login`,
      LOGOUT: `${base}/auth/logout`
    };
  }
  _get(url, callback) {
    request.get(url)
      .end(callback);
  }
  _post(url, payload, callback) {
    request.post(url)
      .type('form')
      .send(payload)
      .end(callback);
  }
  _put(url, payload, callback) {
    request.put(url)
      .send(payload)
      .end(callback);
  }
  _del(url, callback) {
    request.del(url)
      .end(callback);
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

  logout() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 500);
    })
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
