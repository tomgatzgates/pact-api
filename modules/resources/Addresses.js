import PactResource from '../PactResource';

export default class Addresses extends PactResource {
  constructor(pactAPI) {
    const path = '/users/me/addresses';
    const includeBasic = [
      'list',
      'retrieve',
      'create',
      'update',
      'del',
    ];
    super({pactAPI, path, includeBasic});
  }
}
