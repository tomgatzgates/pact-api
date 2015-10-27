import PactResource from '../PactResource';
import pactMethod from '../pactMethod';
import methodTypes from '../methodTypes';

export default class Orders extends PactResource {
  constructor(pactAPI) {
    const path = '/users/me/orders';
    const includeBasic = [
      'retrieve',
      'create',
      'update',
      'del',
    ];

    const methods = {
      list: pactMethod({
        method: methodTypes.GET,
        queryParams: ['states', 'per_page', 'page'],
      }),
    };

    super({pactAPI, path, includeBasic, methods});
  }
}
