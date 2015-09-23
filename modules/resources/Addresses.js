import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methods from '../methods';

export default class Addresses extends PactResource {
  constructor(pactAPI) {
    const path = '/users/me/addresses';
    const includeBasic = [
      'list',
      'retrieve',
      'create',
      'update',
      'del'
    ];
    super({pactAPI, path, includeBasic, methods});
  }
}
