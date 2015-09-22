import request from 'superagent';
import pactMethod from './pactMethod';

const basicMethods = {
  create: pactMethod({
    method: 'post',
  }),
  delete: pactMethod({
    method: 'del',
  }),
};

export default class PactResource {
  constructor({pactAPI, path, includeBasic, methods}) {
    this._pactAPI = pactAPI;
    this.path = path;

    // Resource path is different to method path

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
    const token = this._pactAPI.getAPIField('token');
    const url = base + path;

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

    // TODO: check methods exist on superagent
  }
}
