import request from 'superagent';
require('es6-promise').polyfill();

const CORE = 'https://pact-core.herokuapp.com';
const USERS = `${CORE}/users`;

function _get(url, callback) {
  request
    .get(url)
    .end(callback);
}

function _post(url, payload, callback) {
  request
    .post(url)
    .send(payload)
    .end(callback);
}

function _put(url, payload, callback) {
  request
    .put(url)
    .send(payload)
    .end(callback);
}
function _del(url, callback) {
  request
    .del(url)
    .end(callback);
}

export function getOrders(userId) {
  return new Promise((resolve, reject) => {
    _get(`${USERS}/${userId}/orders`, function(err, response) {
      if (err) {
        reject(err);
        return;
      }
      resolve(response);
    });
  });
}

