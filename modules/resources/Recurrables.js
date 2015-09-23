import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methods from '../methods';

export default class Recurrables extends PactResource {
  constructor(pactAPI) {
    const path = '/users/me/recurrables';
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
