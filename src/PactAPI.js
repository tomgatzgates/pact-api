import request from 'superagent';
require('es6-promise').polyfill();

export class PactAPI {
  constructor({host, token}) {
    this.token = token;
    this.endpoints = {
      USERS: `${host}/users`,
      LOGIN: `${host}/auth/login`
    };
  }
  _get(url, callback) {
    request.get(url)
      .end(callback);
  }
  _authedGet(url, callback) {
    request.get(url)
      .set('Authorization', this.token)
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
    const {endpoints} = this;
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
    const {endpoints} = this;
    return new Promise((resolve, reject) => {
      _authedGet(`${endpoints.USERS}/${userId}/orders`, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.body);
      });
    });
  }
}
