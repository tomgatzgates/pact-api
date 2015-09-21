import request from 'superagent';
import PactMethod from './PactMethod';

class PactResource {
  constructor(pactApi) {
    this._api = pactApi;
    this.request = this.request.bind(pactApi);
  }
  request(method, path, payload) {
    console.log(`1. request[${method}]('${this.base}${path}')`)
    console.log(this.getApiField('key'));
    console.log(this.getApiField('base'));
  }
}

