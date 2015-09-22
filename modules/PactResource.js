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
  constructor({pactAPI, includeBasic, methods}) {
    this._pactAPI = pactAPI;

    Object.keys(methods).forEach(k => {
      this[k] = methods[k];
    });

    if (includeBasic) {
      includeBasic.methods.forEach(method => {
        this[method] = basicMethods[method];
      }, this);
    }
  }

  _request(method, path, payload) {
    const base = this._pactAPI.getAPIField('base');
    const key = this._pactAPI.getAPIField('key');
    const url = base + path;

    // TODO: check methods exist on superagent
    const req = request[method](url);

    if (payload) {
      req.send(payload);
    }
    if (key) {
      req.auth(key, '');
    }
  }
}
