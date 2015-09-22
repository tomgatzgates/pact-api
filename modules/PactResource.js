const basicMethods = {
  create: pactMethod({
    method: 'post'
  }),
  delete: pactMethod({
    method: 'del'
  })
}

class PactResource {
  constructor({pactAPI, path, includeBasic, methods}) {
    this._pactAPI = pactAPI;

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
    console.log(`request.${method}(${path})`);
    if (payload) {
      console.log(`request.send(${payload})`);
    }
    console.log(`key: ${this._pactAPI.getAPIField('key')}`);
  }
}
