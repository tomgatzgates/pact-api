import PactResource from '../PactResource';

export default class Orders extends PactResource {
  constructor(pactAPI) {
    const path = '/users/me/orders';
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
