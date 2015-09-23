import request from 'superagent';

import pactMethod from './pactMethod';
import methods from './methods';

const basicMethods = {
  // List records from the API
  list: pactMethod({
    method: methods.GET,
  }),
  // Retrieve a specific record from the API
  retrieve: pactMethod({
    method: methods.GET,
    urlParams: ['id'],
    path: '{id}',
  }),
  // Create a record
  create: pactMethod({
    method: methods.POST,
  }),
  // Update an existing record
  update: pactMethod({
    method: methods.PATCH,
    urlParams: ['id'],
    path: '{id}',
  }),
  // Delete a record
  del: pactMethod({
    method: methods.DELETE,
    urlParams: ['id'],
    path: '{id}',
  }),
};

export default class PactResource {
  constructor({path, includeBasic, methods}) {
    this._pactAPI = pactAPI;
    this.path = path;

    Object.keys(methods).forEach(k => {
      this[k] = methods[k];
    });

    if (includeBasic) {
      includeBasic.forEach(method => {
        this[method] = basicMethods[method];
      }, this);
    }
  }

  _request(method, path, payload) {
    const base = this._pactAPI.getAPIField('base');
    const version = this._pactAPI.getAPIField('version');
    const token = this._pactAPI.getAPIField('token');
    const url = `${base}/${version}${path};`

    return new Promise((resolve, reject) => {
      const req = request[method](url);
      if (payload) {
        req.send(payload);
      }
      if (token) {
        req.auth(token, '');
      }
      req.end((err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.body);
      });
    });
  }
}
