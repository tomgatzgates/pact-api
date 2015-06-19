import request from 'superagent';
require('es6-promise').polyfill();

let TOKEN;

const BASE = 'https://pact-api-proxy.herokuapp.com/v1';
const endpoints = {
  USERS: `${BASE}/users`,
  LOGIN: `${BASE}/auth/login`
};

function _get(url, callback) {
  request.get(url)
    .end(callback);
}

function _authedGet(url, callback) {
  request.get(url)
    .set('Authorization', TOKEN)
    .end(callback);
}

function _post(url, payload, callback) {
  request.post(url)
    .type('form')
    .send(payload)
    .end(callback);
}

function _put(url, payload, callback) {
  request.put(url)
    .send(payload)
    .end(callback);
}

function _del(url, callback) {
  request.del(url)
    .end(callback);
}

export function setAccessToken(token) {
  TOKEN = token;
}

export function login(login, password) {
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

export function logout() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 500);
  })
}

export function getOrders(userId) {
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
